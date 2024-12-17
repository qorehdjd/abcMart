import os
import cv2
import csv
import torch
import pandas as pd
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2.utils.visualizer import Visualizer, ColorMode
from detectron2.data import MetadataCatalog
from detectron2 import model_zoo
import numpy as np
import math

def setup_cfg(config_file, weights_path, num_classes, keypoint_num=None, params=None):
    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file(config_file))
    cfg.MODEL.WEIGHTS = weights_path
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = num_classes
    cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 512
    cfg.MODEL.ANCHOR_GENERATOR.SIZES = [[4, 8, 16, 32, 64, 128, 256, 512]]
    cfg.MODEL.ANCHOR_GENERATOR.ASPECT_RATIOS = [0.5, 1.0, 2.0]

    if keypoint_num:
        cfg.MODEL.KEYPOINT_ON = True
        cfg.MODEL.ROI_KEYPOINT_HEAD.NUM_KEYPOINTS = keypoint_num

    if params:
        for key, value in params.items():
            setattr(cfg, key, value)

    cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    
    return cfg

seg_weights_path = "C:/Users/MYCOM/Desktop/abcMart/backend/app/ai/models/model_final_sg.pth"
kp_weights_path = "C:/Users/MYCOM/Desktop/abcMart/backend/app/ai/models/model_final_ky.pth"

segmentation_params = {
    'MODEL.RPN.IOU_THRESHOLDS': [0.3, 0.7],
    'MODEL.ROI_HEADS.IOU_THRESHOLDS': [0.7],
}

keypoint_params = {
    'MODEL.KEYPOINT_ON': True,
    'MODEL.ROI_KEYPOINT_HEAD.NUM_KEYPOINTS': 14,
    'MODEL.ROI_HEADS.IOU_THRESHOLDS': [0.7],
    'MODEL.ROI_HEADS.SCORE_THRESH_TEST': 0.7
}

seg_cfg = setup_cfg("COCO-InstanceSegmentation/mask_rcnn_X_101_32x8d_FPN_3x.yaml", seg_weights_path, num_classes=3, params=segmentation_params)
kp_cfg = setup_cfg("COCO-Keypoints/keypoint_rcnn_X_101_32x8d_FPN_3x.yaml", kp_weights_path, num_classes=1, keypoint_num=14, params=keypoint_params)

seg_metadata = MetadataCatalog.get("my_dataset_train")
seg_metadata.thing_classes = ["forefoot", "midfoot", "hindfoot"]
keypoint_names = ["MM", "MMT", "AW", "1MTB", "1MTH", "1DPS", "1DPT", "1DPI", "SB", "FB", "CT", "AI", "CPFI", "CAT"]
kp_metadata = MetadataCatalog.get("keypoints_train")
kp_metadata.keypoint_names = keypoint_names

custom_colors = {
    "forefoot": (1.0, 0.75, 0.8), 
    "midfoot": (0.75, 1.0, 0.75),  
    "hindfoot": (0.75, 0.9, 1.0)  
}

seg_predictor = DefaultPredictor(seg_cfg)
kp_predictor = DefaultPredictor(kp_cfg)

def calculate_angle_from_intersection(intersection, A, C):
    PA = np.array(A) - np.array(intersection)
    PC = np.array(C) - np.array(intersection)
    dot_product = np.dot(PA, PC)
    magnitude_PA = np.linalg.norm(PA)
    magnitude_PC = np.linalg.norm(PC)
    
    if magnitude_PA == 0 or magnitude_PC == 0:
        return None
    
    cos_theta = dot_product / (magnitude_PA * magnitude_PC)
    cos_theta = np.clip(cos_theta, -1.0, 1.0)
    return math.degrees(math.acos(cos_theta))

def calculate_intersection(A, B, C, D):
    a1, b1 = B[1] - A[1], A[0] - B[0]
    c1 = a1 * A[0] + b1 * A[1]
    a2, b2 = D[1] - C[1], C[0] - D[0]
    c2 = a2 * C[0] + b2 * C[1]

    determinant = a1 * b2 - a2 * b1
    if determinant == 0:
        return None  

    x = (b2 * c1 - b1 * c2) / determinant
    y = (a1 * c2 - a2 * c1) / determinant
    return (int(x), int(y))
    
    
def save_samples(dst_path, image_path, csv_path, mode="choice", size=None, index=None):
    df = pd.read_csv(csv_path)
    for idx in index:
        image_name = df.iloc[idx, 0]
        keypoints = df.iloc[idx, 1:].values.astype(np.float32).reshape(-1, 2)
        image = cv2.imread(os.path.join(image_path, image_name))
        if image is None:
            print(f"load error {image_name}")
            continue
        for kp in keypoints:
            cv2.circle(image, tuple(kp.astype(int)), 5, (0, 255, 0), -1)
        result_image_path = os.path.join(dst_path, f"result_{image_name}")
        cv2.imwrite(result_image_path, image)
        print(f"Result saved to {result_image_path}")


def draw_combined_predictions(image, seg_outputs, kp_outputs, image_name, csv_writer, object_name):
    v = Visualizer(image[:, :, ::-1], seg_metadata, instance_mode=ColorMode.IMAGE)
    seg_instances = seg_outputs["instances"].to("cpu")
    kp_instances = kp_outputs["instances"].to("cpu")

    assigned_colors = [custom_colors[seg_metadata.thing_classes[i]] for i in seg_instances.pred_classes]
    out = v.overlay_instances(masks=seg_instances.pred_masks, assigned_colors=assigned_colors,
                            labels=[seg_metadata.thing_classes[i] for i in seg_instances.pred_classes])
    vis_output_img = out.get_image()[:, :, ::-1].copy()

    keypoints = kp_instances.pred_keypoints

    for kp in keypoints:
        valid_keypoints = [(int(x), int(y)) for (x, y, prob) in kp if prob > 0.5]
        valid_keypoints_names = [keypoint_names[i] for i, (_, _, prob) in enumerate(kp) if prob > 0.5]

        for i, (x, y, prob) in enumerate(kp):
            if prob > 0.5:
                cv2.circle(vis_output_img, (int(x), int(y)), 8, (0, 255, 0), -1)
                cv2.putText(vis_output_img, keypoint_names[i], (int(x), int(y) - 10), cv2.FONT_HERSHEY_SIMPLEX,
                            1.0, (255, 0, 0), 2)

        for i in range(len(valid_keypoints)):
            for j in range(i + 1, len(valid_keypoints)):
                color = (0, 0, 255) if (
                    (valid_keypoints_names[i] == "1DPI" and valid_keypoints_names[j] == "MMT") or
                    (valid_keypoints_names[i] == "MMT" and valid_keypoints_names[j] == "1DPI") or
                    (valid_keypoints_names[i] == "AI" and valid_keypoints_names[j] == "1MTB") or
                    (valid_keypoints_names[i] == "1MTB" and valid_keypoints_names[j] == "AI")
                ) else (0, 255, 0)
                cv2.line(vis_output_img, valid_keypoints[i], valid_keypoints[j], color, 2)

        if all(name in valid_keypoints_names for name in ["1DPI", "MMT", "AI", "1MTB"]):
            dpi_idx = valid_keypoints_names.index("1DPI")
            mmt_idx = valid_keypoints_names.index("MMT")
            ai_idx = valid_keypoints_names.index("AI")
            mtb_idx = valid_keypoints_names.index("1MTB")

            intersection = calculate_intersection(valid_keypoints[mmt_idx], valid_keypoints[dpi_idx],
                                                valid_keypoints[ai_idx], valid_keypoints[mtb_idx])
            if intersection:
                height, width = vis_output_img.shape[:2]
                
                angle = calculate_angle_from_intersection(intersection,
                                                        valid_keypoints[dpi_idx], valid_keypoints[mtb_idx])
                if angle is not None:
                    angle_name = f"{object_name} Angle between 1DPI-MMT and AI-1MTB"
                    csv_writer.writerow([angle_name, f"{angle:.2f}"])
                    cv2.circle(vis_output_img, intersection, 8, (0, 0, 255), -1)
                    cv2.drawMarker(vis_output_img,
                                (intersection[0], min(intersection[1], height - 1)),
                                (255, 0, 0), markerType=cv2.MARKER_CROSS,
                                markerSize=20,
                                thickness=2)

    return vis_output_img



async def predict_and_save(input_folder, output_folder, csv_path):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    if not os.path.exists(csv_path):
        with open(csv_path, mode='w', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(["angle_name", "angle_value"])

    with open(csv_path, mode='a', newline='') as file:  
        csv_writer = csv.writer(file)

        for image_name in os.listdir(input_folder):
            index = int(image_name.split("_")[1].split(".")[0])
            if index not in [0, 1]: # 평발 / 0: Rt, 1:Lt
                continue

            image_path = os.path.join(input_folder, image_name)
            img = cv2.imread(image_path)
            if img is None:
                print(f"Skip {image_path}")
                continue

            seg_outputs = seg_predictor(img)
            kp_outputs = kp_predictor(img)

            index = int(image_name.split("_")[1].split(".")[0])
            object_map = {
                0: "RtMedi",
                1: "LtMedi",
                2: "LtAnkl",
                3: "RtAnkl",
                4: "Rtsupe",
                5: "Ltsupe",
                6: "Blae"
            }
            object_name = object_map.get(index)

            combined_img = draw_combined_predictions(img, seg_outputs, kp_outputs, image_name, csv_writer, object_name)
            
            result_image_path = os.path.join(output_folder, f"result_{image_name}")
            cv2.imwrite(result_image_path, combined_img)

input_folder = "'C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/input/"
output_folder = "C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/output/"
csv_path = os.path.join(output_folder, "angles_results.csv")
