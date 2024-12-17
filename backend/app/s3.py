import asyncio
import random
import boto3
from config import Config
from datetime import datetime
import os
from PIL import Image
import io

async def s3Upload(output_dir, filenames, image_data_list=None):
    today = datetime.now().strftime("%Y%m%d")
    folder_name = f"{today}/"

    s3 = boto3.client(
        's3',
        aws_access_key_id=Config.AWS_ACCESS_KEY,
        aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
    )

    try:
        if image_data_list: 
            async def upload_one_image(filename, image_data):
                image = Image.open(io.BytesIO(image_data))
                width, height = image.size
                new_width = int(width * 0.9)
                new_height = int(height * 0.9)
                resized_image = image.resize((new_width, new_height))

                output_buffer = io.BytesIO()
                resized_image.save(output_buffer, "JPEG", quality=70)
                resized_image_data = output_buffer.getvalue()

                s3.put_object(
                    Bucket=Config.S3_BUCKET,
                    Key=folder_name + filename,
                    Body=resized_image_data,
                    ACL='public-read',
                    ContentType='image/jpeg'
                )
                file_url = f"https://{Config.S3_BUCKET}.s3.{Config.AWS_REGION}.amazonaws.com/{folder_name}{filename}"
                # print("업로드 완료", {"file_url": file_url})
                return file_url

            tasks = [upload_one_image(filename, image_data) for filename, image_data in zip(filenames, image_data_list)]
            return await asyncio.gather(*tasks)

        else:
            async def upload_one_file(filename):
                with open(os.path.join(output_dir, filename), 'rb') as f:
                    s3.put_object(
                        Bucket=Config.S3_BUCKET,
                        Key=folder_name + filename,
                        Body=f,
                        ACL='public-read',
                        ContentType='image/jpeg'
                    )
                file_url = f"https://{Config.S3_BUCKET}.s3.{Config.AWS_REGION}.amazonaws.com/{folder_name}{filename}"
                # print("업로드 완료", {"file_url": file_url})
                return file_url

            tasks = [upload_one_file(filename) for filename in filenames]
            return await asyncio.gather(*tasks)

    except Exception as e:
        print(f"S3 업로드 실패: {e}")
        return {'error': str(e)}, 500