from asyncio import Queue
from contextlib import asynccontextmanager
from datetime import datetime
from functools import wraps
import os
import sqlite3
import aiosqlite
from fastapi import HTTPException
from passlib.context import CryptContext
from sqlalchemy.future import select
from app.user_schema import Nickname, UserCreate, LoginBase, idFindForm_email, idFindform_sms, pwFindForm_email, pwFindForm_sms, updatePw, gptBase, UserIdForm, resultBase
from sqlalchemy.ext.asyncio import AsyncSession
from app.user_models import User, AnalysisResult, NicknameBase
from sqlalchemy.orm import Session
from sqlalchemy import or_
from async_lru import alru_cache

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class DBPool:
    def __init__(self, max_connections=10):
        self.pool = Queue(maxsize=max_connections)

        async def get_connection(self):
            if self.pool.empty():
                return await aiosqlite.connect('data.db')
            return await self.pool.get()

        async def release_connection(self, conn):
            await self.pool.put(conn)

db_pool = DBPool()
    

class UserService:
    # 이메일 중복 확인
    @classmethod
    async def get_existing_user(cls, db: AsyncSession, userId: str, email: str, phone: str):
        result = await db.execute(select(User).filter(or_(User.userId == userId, User.email == email, User.phone == phone)))
        return result.scalar_one_or_none()
    
    # 회원 가입
    @classmethod
    async def userCreate(cls, db: AsyncSession, user_create: UserCreate):
        
        db_user = User(
            userId=user_create.userId,
            email=user_create.email, 
            hashed_pw=pwd_context.hash(user_create.password1),
            phone=user_create.phone,
            username=user_create.username,
            created_at=datetime.now()
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)        
        return db_user
        
    # 로그인
    @classmethod
    async def userLogin(cls, login_base: LoginBase, db: AsyncSession):
        async with db.begin():
            result = await db.execute(select(User).filter(User.userId == login_base.userId))
            return result.scalars().first()
        
    
    
    # 닉네임 설정
    @classmethod
    async def set_nickname(cls, body: Nickname):
        async with aiosqlite.connect('data.db') as db:
            try:
                await db.execute('''
                    INSERT INTO nickname (nickname, created_at)
                    VALUES (?, ?)
                ''', (body.nickname, datetime.now().isoformat()))
                
                await db.commit()
                return {"message": "닉네임이 성공적으로 설정되었습니다."}
            except sqlite3.Error as e:
                await db.rollback()
                return {"error": f"닉네임 설정 중 오류 발생: {str(e)}"}
    
    
    @classmethod
    async def setup_database(cls):
        async with aiosqlite.connect('data.db') as db:
            await db.execute('PRAGMA journal_mode = WAL;')
            await db.execute('''CREATE TABLE IF NOT EXISTS nickname (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL
            );''')
            await db.execute('CREATE INDEX IF NOT EXISTS idx_nickname ON nickname(nickname);')
            await db.commit()

    @classmethod
    @alru_cache(maxsize=200000)
    async def get_nickname(cls, nickname :str):
        async with aiosqlite.connect('data.db') as db:
            await db.execute('PRAGMA journal_mode = WAL;')
            try:
                async with db.execute('SELECT nickname FROM nickname WHERE nickname = ?', (nickname,)) as cursor:
                    result = await cursor.fetchone()
                    return result[0] if result else None
            except sqlite3.Error as e:
                print(f"데이터베이스 쿼리 중 오류 발생: {e}")
                return None

    @classmethod
    def clear_cache(cls):
        cls.get_nickname.cache_clear()
    
    @classmethod
    async def warm_up_cache(cls):
        common_ids = range(1, 1001)  # 예: 자주 사용되는 ID 1-1000
        await cls.get_nicknames_batch(common_ids)
    
    # 닉네임 my조회
    @classmethod
    @alru_cache(maxsize=20000)
    async def get_nickname_my(cls, nickname_id: int, db: AsyncSession):
        async with db.begin():
            try:
                result = await db.execute(select(NicknameBase).filter(NicknameBase.id == nickname_id))
                nickname = result.scalars().first()
                if nickname is None:
                    print(f"ID {nickname_id}에 해당하는 닉네임을 찾을 수 없습니다.")
                return nickname
            except Exception as e:
                print(f"닉네임 조회 중 오류 발생: {e}")
                return None


    # 아이디 찾기
    @classmethod
    async def userIdFind_email(cls, id_find: idFindForm_email, db: AsyncSession):
        async with db.begin():
            emailVerify = await db.execute(select(User).filter(User.username == id_find.username, User.email == id_find.email))
            return emailVerify.scalars().first()
            
    @classmethod
    async def userIdFind_sms(cls, id_find: idFindform_sms, db: AsyncSession):
        async with db.begin():
            phoneVerify = await db.execute(select(User).filter(User.username == id_find.username, User.phone == id_find.phone))
            return phoneVerify.scalars().first()
    
    
    # 비번 찾기
    @classmethod
    async def userPwFind_email(cls, pw_find: pwFindForm_email, db:AsyncSession):
        async with db.begin():
            emailVerify = await db.execute(select(User).filter(User.userId == pw_find.userId, User.username == pw_find.username, User.email == pw_find.email))
            return emailVerify.scalars().first()
    
    @classmethod
    async def userPwFind_sms(cls, pw_find: pwFindForm_sms, db:AsyncSession):
        async with db.begin():
            phoneVerify = await db.execute(select(User).filter(User.userId == pw_find.userId, User.username == pw_find.username, User.phone == pw_find.phone))
            return phoneVerify.scalars().first()
        
    
    # 이메일 아이디 찾기 결과
    @classmethod
    async def userIdFind_email(cls, id_find: UserIdForm, db: AsyncSession):
        async with db.begin():
            stmt = select(User).filter(User.username == id_find.username, User.email == id_find.email)
            user = await db.execute(stmt)
            return user.scalars().first()
    
    # sms 아이디 찾기 결과
    @classmethod
    async def userIdFind_phone(cls, id_find: UserIdForm, db: AsyncSession):
        async with db.begin():
            stmt = select(User).filter(User.username == id_find.username, User.phone == id_find.phone)
            user = await db.execute(stmt)
            return user.scalars().first()
    
    # 이메일 비번 찾기 -> 비번 변경  
    @classmethod
    async def updatePw_email(cls, pwForm: pwFindForm_email, set_newpw: updatePw, db: AsyncSession):
        async with db.begin():
            stmt = select(User).filter(User.userId == pwForm.userId, User.username == pwForm.username, User.email == pwForm.email)
            result = await db.execute(stmt)
            user = result.scalars().first()
            if not user:
                raise HTTPException(status_code=404, detail="일치하는 계정을 찾을 수 없습니다.")
            user.hashed_pw = pwd_context.hash(set_newpw.new_pw1)
            await db.commit()
    
    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)
    
    
    # sms 비번 찾기 -> 비번 변경  
    @classmethod
    async def updatePw_sms(cls, pwReset: pwFindForm_sms, set_newpw: updatePw, db: AsyncSession):
        async with db.begin():
            stmt = select(User).filter(User.userId == pwReset.userId, User.username == pwReset.username, User.phone == pwReset.phone)
            result = await db.execute(stmt)
            user = result.scalars().first()
            if not user:
                raise HTTPException(status_code=404, detail="일치하는 계정을 찾을 수 없습니다.")
            user.hashed_pw = pwd_context.hash(set_newpw.new_pw1)
            await db.commit()
    
    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)
    
    
    # 이미지 분석 결과
    @classmethod
    async def save_analysis_result(cls,  username: str, userResult: dict, db: AsyncSession):
        db_result = AnalysisResult(
            username=username,
            LtSupe = userResult.LtSupe,
            RtSupe = userResult.RtSupe,
            LtSupeInUrl = userResult.LtSupeInUrl,
            LtSupeOutUrl = userResult.LtSupeOutUrl,
            RtSupeInUrl = userResult.RtSupeInUrl,
            RtsupeOutUrl = userResult.RtsupeOutUrl,
            LtMedi = userResult.LtMedi,
            RtMedi = userResult.RtMedi,
            LtMediInUrl= userResult.LtMediInUrl,
            LtMediOutUrl= userResult.LtMediOutUrl,
            RtMediInUrl = userResult.RtMediInUrl,
            RtMediOutUrl = userResult.RtMediOutUrl,
            LtAnkl = userResult.LtAnkl,
            RtAnkl = userResult.RtAnkl,
            LtAnklInUrl = userResult.LtAnklInUrl,
            LtAnklOutUrl = userResult.LtAnklOutUrl,
            RtAnklInUrl = userResult.RtAnklInUrl,
            RtAnklOutUrl = userResult.RtAnklOutUrl,
            Bla = userResult.Bla,
            blaInUrl = userResult.blaInUrl,
            blaOutUrl = userResult.blaOutUrl,
            created_at=datetime.now()
        )
        db.add(db_result)
        await db.commit()
        await db.refresh(db_result)        
        return db_result 
    
    
    # gpt 분석 (데이터베이스 저장 여부 확인, 데이터베이스 모델 필요)
    # @classmethod
    # async def gpt_result(cls, userId: str, gpt_result: gptBase, db:AsyncSession):
    #     db_result = gpt_result(
    #         userId = gpt_result.userId,
    #         custom_id = gpt_result.custom_id,
    #         custom_size = gpt_result.custom_size,
    #         content = gpt_result.content
    #     )
    #     db.commit()
    #     db.refresh(db_result)
    #     return db_result
    
    
    # # 회원 인증
    # @classmethod
    # def userAuthenticate(cls, db: AsyncSession, userId: str, password: str):
    #     user = db.query(user.User).filter(
    #         (user.User.userId == userId | user.User.password == password)).first()
    #     if not user or not pwd_context.verify(password, user.password):
    #         return None
    #     return user


    # #회원 정보 업데이트
    # @classmethod
    # def userUpdate(cls, db: Session, user_id: int, new_data: UserCreate):
    #     user = db.query(User).filter(User.id == user_id).first()
    #     if not user:
    #         return None
    #     user.username = new_data.username
    #     user.email = new_data.email
    #     db.commit()
    #     return user
    
    
    # # 회원 정보 삭제
    # @classmethod
    # def userDelete(cls, db: Session, user_id: int):
    #     user = db.query(User).filter(User.id == user_id).first()
    #     if not user:
    #         return None
    #     db.delete(user)
    #     db.commit()
    #     return True
    
