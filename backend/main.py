import uvicorn
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware #cors middleware
from starlette.middleware.httpsredirect import (  # noqa  - https redirect
    HTTPSRedirectMiddleware as HTTPSRedirectMiddleware,
)
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

from app import user_router
from app import analysis_router

from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()


app.mount("/images", StaticFiles(directory="C:/Users/MYCOM/Desktop/abcMart/backend/FootABC/images"), name="images")

# middleware
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router.router, tags=['user'])
app.include_router(analysis_router.router, tags=['analyze'])
app.add_middleware(GZipMiddleware, minimum_size=1000)



if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)