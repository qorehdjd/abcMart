import asyncio
import csv
import io
import os
import tempfile
import time
from datetime import datetime
from typing import List
from PIL import Image
from multiprocessing import Pool
from apscheduler.schedulers.background import BackgroundScheduler

from fastapi import (APIRouter, BackgroundTasks, Depends, File, HTTPException,
                    Request, UploadFile)
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.inference_medi import predict_and_save as medi_predict
from app.ai.inference_ankl import predict_and_save as ankl_predict
from app.ai.gpt import create_prompt
from app.s3 import s3Upload
from app.user_database import get_db
from app.user_schema import (gptBase)

router = APIRouter(prefix="/analyze", tags=['analyze'])

# 메모리 저장
memory_store = []


def filter_images_by_content_type(images: List[UploadFile]) -> List[tuple]:
    indexed_images = [
        (index, image)
        for index, image in enumerate(images)
        if image.headers.get('content-type') != 'application/x-empty'
    ]
    
    return indexed_images


def delete_old_files(dir_path, max_age_seconds):
    """
    지정된 폴더에서 일정 시간이 지난 파일을 삭제합니다.

    Args:
        dir_path (str): 파일을 삭제할 폴더 경로
        max_age_seconds (int): 파일의 최대 보관 시간 (초)
    """
    now = time.time()
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isfile(file_path):
            file_age_seconds = now - os.path.getmtime(file_path)
            if file_age_seconds > max_age_seconds:
                os.remove(file_path)
                print(f"{file_path} 삭제됨")


# 이미지 분석 처리
@router.post("/")
async def analyze(request: Request, background_tasks: BackgroundTasks, images: List[UploadFile] = File(...), db: AsyncSession = Depends(get_db)):
    
    start_time = time.time()
    
    # 평발 : medi
    # 무지외반 : supe
    # 발목 불안 : ankl
    # 하지정렬 : bla
    
    filtered_images = filter_images_by_content_type(images)

    current_date = datetime.now().strftime("%Y%m%d%H%M%S")
    input_dir = 'C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/input'
    os.makedirs(input_dir, exist_ok=True)
    output_dir = 'C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images/output'
    os.makedirs(output_dir, exist_ok=True)
    
    for directory in [input_dir, output_dir]:
        if os.path.isdir(directory):
            for filename in os.listdir(directory):
                file_path = os.path.join(directory, filename)
                if os.path.isfile(file_path):
                    os.unlink(file_path)
    
    # 스케줄러 사용
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(delete_old_files, 'cron', hour=0, minute=0, args=[input_dir, 24 * 60 * 60])
    # scheduler.add_job(delete_old_files, 'cron', hour=0, minute=0, args=[output_dir, 24 * 60 * 60])
    # scheduler.start()
                    
    input_filenames = []
    output_filenames = []
    for index, image in filtered_images:
        contents = await image.read()
        filename = f'{current_date}_{index}.jpg'
        file_path = os.path.join(input_dir, filename)
        with open(file_path, "wb") as f:
            f.write(contents)
            input_filenames.append(filename)
        
    middle_time = time.time()
    print("save_file: ", middle_time- start_time)
    
    
    # 이미지 분석
    try:        
        csv_path = os.path.join(output_dir, "angles_results.csv")
            
        # supeAnalyze = [  # 무지외반 / 4 : Rt, 5: Lt
        #     (index, os.path.join(input_dir, f"{current_date}_{index}.jpg"))
        #     for index, _ in filtered_images
        #     if index in [4, 5]
        # ]
        # blaAnalyze = [  # 하지정렬
        #     (index, os.path.join(input_dir, f"{current_date}_{index}.jpg"))
        #     for index, _ in filtered_images
        #     if index in [6]
        # ]         
        
        await medi_predict(input_dir, output_dir, csv_path)
        await ankl_predict(input_dir, output_dir, csv_path)

        
        # elif ante:
            # supe_predict(input_dir, output_dir)
            
        # await asyncio.gather(medi_event.wait(), ankl_event.wait())
    
            # 데이터베이스 저장
            # await UserService.save_analysis_result(username, userResult, db)
            
        anlayze_time = time.time()
        print("anlayze_time: ", anlayze_time - middle_time)
        
        object_map = {
            0: "RtMedi",
            1: "LtMedi",
            2: "LtAnkl",
            3: "RtAnkl",
            4: "Rtsupe",
            5: "Ltsupe",
            6: "Blae"
        }
        
        input_urls_dict = {}
        output_urls_dict = {}

        input_image_data_list = []
        output_image_data_list = []

        for i, input_filename in enumerate(os.listdir(input_dir)):
            if input_filename in input_filenames:
                index = int(input_filename.split("_")[1].split(".")[0])
                object_name = object_map.get(index)
                if object_name:
                    input_image_path = os.path.join(input_dir, input_filename)
                    with open(input_image_path, "rb") as f:
                        image_data = f.read()
                    input_urls_dict[object_name] = os.path.abspath(input_image_path).replace("\\", "/")

        for i, output_filename in enumerate(os.listdir(output_dir)):
            if output_filename.endswith(".jpg") or output_filename.endswith(".png"):
                index = int(output_filename.split("_")[2].split(".")[0])
                object_name = object_map.get(index)
                if object_name:
                    output_image_path = os.path.join(output_dir, output_filename)
                    with open(output_image_path, "rb") as f:
                        image_data = f.read()
                    output_filenames.append(output_filename)  
                    output_image_data_list.append(image_data)  
                    output_urls_dict[object_name] = os.path.abspath(output_image_path).replace("\\", "/")

        background_tasks.add_task(s3Upload, input_dir, input_filenames, input_image_data_list)
        background_tasks.add_task(s3Upload, output_dir, output_filenames, output_image_data_list)
                
        angle_results = []
        if os.path.exists(csv_path):
            with open(csv_path, mode='r') as file:
                csv_reader = csv.reader(file)
                next(csv_reader, None)
                angle_results.extend(list(csv_reader))
        
        angles_dict = {}
        if angle_results:
            for row in angle_results[0:]: 
                angle_name, angle_value = row  
                angles_dict[angle_name] = angle_value
        
        end_time = time.time()
        print("end_time: ", end_time - anlayze_time)

        return {"input": input_urls_dict, "output": output_urls_dict, "angles": angles_dict}

    except Exception as e:
        print(e)
        return {'error': 'Image analysis failed'}, 500



# 결과 페이지 사용 여부 확인(데이터베이스 적용 여부)
@router.post("/result/")
async def result(request: Request):
    # 데이터베이스에서 결과 조회
    # try:
    #     result = await UserService.get_analysis_result(result_id, db)
    #     if result:
    #         return JSONResponse(status_code=200, content={
    #             'result': result
    #         })
    #     else:
    #         raise HTTPException(status_code=404, detail='Result not found')
    
    # except Exception as e:
    #     print(e)
    #     return JSONResponse(status_code=500, content={'error': 'Failed to retrieve result'})
    
    # 메모리에서 결과 조회   
    if memory_store:
        latest_result = memory_store[-1]
        return JSONResponse(status_code=200, content={'results': latest_result})
    else:
        return JSONResponse(status_code=404, content={'error': 'No results found'})



# gpt 분석
@router.post("/gpt/", response_class=JSONResponse)
async def create_gpt(request: Request, data: gptBase):
    try:
        request_body = await request.json()
        print("요청 본문:", request_body)

        content = create_prompt(data.content)
        if content is None:
            raise HTTPException(status_code=204, detail="Something went wrong")

        response_data = {
            "status": 200,
            "content": content
        }
    except HTTPException as e:
        response_data = {
            "status": e.status_code,
            "data": "다시 시도해주세요."
        }
    return JSONResponse(content=response_data)