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

def setup_cfg(config_file, weights_path, num_classes, keypoint_num=None, params=None, anchor_sizes=None, aspect_ratios=None):
    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file(config_file))
    cfg.MODEL.WEIGHTS = weights_path
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = num_classes
    cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 512

    if anchor_sizes:
        cfg.MODEL.ANCHOR_GENERATOR.SIZES = anchor_sizes
    if aspect_ratios:
        cfg.MODEL.ANCHOR_GENERATOR.ASPECT_RATIOS = aspect_ratios

    if keypoint_num:
        cfg.MODEL.KEYPOINT_ON = True
        cfg.MODEL.ROI_KEYPOINT_HEAD.NUM_KEYPOINTS = keypoint_num

    if params:
        for key, value in params.items():
            setattr(cfg, key, value)

    cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    return cfg

seg_weights_path = "C:/Users/MYCOM/Desktop/abcMart/backend/app/ai/ankl_models/model_final_sg.pth"
kp_weights_path = "C:/Users/MYCOM/Desktop/abcMart/backend/app/ai/ankl_models/model_final_ky.pth"

segmentation_params = {
    'MODEL.RPN.IOU_THRESHOLDS': [0.5],
    'MODEL.ROI_HEADS.IOU_THRESHOLDS': [0.5],
    'MODEL.ROI_HEADS.SCORE_THRESH_TEST': 0.5
}

keypoint_params = {
    'MODEL.KEYPOINT_ON': True,
    'MODEL.ROI_KEYPOINT_HEAD.NUM_KEYPOINTS': 6,
    'MODEL.ROI_HEADS.IOU_THRESHOLDS': [0.7],
    'MODEL.ROI_HEADS.SCORE_THRESH_TEST': 0.7
}

segmentation_anchor_sizes = [[2, 4, 8, 16, 32, 64, 128, 256, 512]]
segmentation_aspect_ratios = [0.25, 0.5, 1.0, 2.0]

keypoint_anchor_sizes = [[4, 8, 16, 32, 64, 128, 256, 512]]
keypoint_aspect_ratios = [0.5, 1.0, 2.0]


seg_cfg = setup_cfg(
    "COCO-InstanceSegmentation/mask_rcnn_R_101_FPN_3x.yaml", 
    seg_weights_path, 
    num_classes=5, 
    params=segmentation_params, 
    anchor_sizes=segmentation_anchor_sizes, 
    aspect_ratios=segmentation_aspect_ratios
)

kp_cfg = setup_cfg(
    "COCO-Keypoints/keypoint_rcnn_X_101_32x8d_FPN_3x.yaml", 
    kp_weights_path, 
    num_classes=1, 
    keypoint_num=6, 
    params=keypoint_params, 
    anchor_sizes=keypoint_anchor_sizes, 
    aspect_ratios=keypoint_aspect_ratios
)

seg_metadata = MetadataCatalog.get("my_segmentation_train")
seg_metadata.thing_classes = ["APS", "CPS(calf)", "CPS(calcaneus)", "MMPS", "LMPS"]

keypoint_names = ["CLC", "AMC", "AIP", "CBC", "MMP", "LMP"]
kp_metadata = MetadataCatalog.get("my_keypoint_train")
kp_metadata.keypoint_names = keypoint_names

custom_colors = {
    "APS": (1.0, 0.75, 0.8), 
    "CPS(calf)": (0.75, 1.0, 0.75),  
    "CPS(calcaneus)": (0.75, 0.9, 1.0),
    "MMPS": (0.9, 0.75, 0.75),
    "LMPS": (0.8, 0.75, 1.0)
}

seg_predictor = DefaultPredictor(seg_cfg)
kp_predictor = DefaultPredictor(kp_cfg)

def calculate_angle(A, B, C):
    AB = np.array(B) - np.array(A)
    AC = np.array(C) - np.array(A)
    dot_product = np.dot(AB, AC)
    magnitude_AB = np.linalg.norm(AB)
    magnitude_AC = np.linalg.norm(AC)
    
    if magnitude_AB == 0 or magnitude_AC == 0:
        return None
    
    cos_theta = dot_product / (magnitude_AB * magnitude_AC)
    cos_theta = np.clip(cos_theta, -1.0, 1.0)
    return math.degrees(math.acos(cos_theta))

def draw_combined_predictions(image, seg_outputs, kp_outputs, image_name, csv_writer, object_name):
    v = Visualizer(image[:, :, ::-1], seg_metadata, instance_mode=ColorMode.IMAGE)
    seg_instances = seg_outputs["instances"].to("cpu")
    kp_instances = kp_outputs["instances"].to("cpu")

    assigned_colors = [custom_colors[seg_metadata.thing_classes[i]] for i in seg_instances.pred_classes]
    out = v.overlay_instances(masks=seg_instances.pred_masks, assigned_colors=assigned_colors, labels=[seg_metadata.thing_classes[i] for i in seg_instances.pred_classes])
    vis_output_img = out.get_image()[:, :, ::-1].copy()

    keypoints = kp_instances.pred_keypoints

    for kp in keypoints:
        valid_keypoints = [(int(x), int(y)) for (x, y, prob) in kp if prob > 0.5]
        valid_keypoints_names = [keypoint_names[i] for i, (_, _, prob) in enumerate(kp) if prob > 0.5]

        for i in range(len(valid_keypoints)):
            for j in range(i + 1, len(valid_keypoints)):
                if (
                    (valid_keypoints_names[i] == "CLC" and valid_keypoints_names[j] == "AMC") or
                    (valid_keypoints_names[i] == "AMC" and valid_keypoints_names[j] == "AIP")
                ):
                    color = (0, 0, 255)  
                else:
                    color = (0, 255, 0)  
                cv2.line(vis_output_img, valid_keypoints[i], valid_keypoints[j], color, 2)

        for i, (x, y, prob) in enumerate(kp):
            if prob > 0.5:
                cv2.circle(vis_output_img, (int(x), int(y)), 8, (0, 255, 0), -1)
                cv2.putText(vis_output_img, keypoint_names[i], (int(x), int(y) - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 0, 0), 2)

    # CLC-AMC / AMC-AIP
    if "CLC" in valid_keypoints_names and "AMC" in valid_keypoints_names and "AIP" in valid_keypoints_names:
        clc_idx = valid_keypoints_names.index("CLC")
        amc_idx = valid_keypoints_names.index("AMC")
        aip_idx = valid_keypoints_names.index("AIP")

        angle = calculate_angle(valid_keypoints[clc_idx], valid_keypoints[amc_idx], valid_keypoints[aip_idx])
        if angle is not None:
            angle_name = f"{object_name} Angle between CLC-AMC-AIP"
            # print(f"{angle_name} is {angle:.2f} degrees")
            csv_writer.writerow([angle_name, f"{angle:.2f}"])

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
            if index not in [2, 3]: # 발목 불안 / 2: Lt, 3:Rt
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
            # print(f"Predicted image saved to {result_image_path}")

input_folder = 'C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/input'
output_folder = 'C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/output'
csv_path = os.path.join(output_folder, "angles_results.csv")

