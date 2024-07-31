import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 600px) {
    html {
      font-size: 45%;
    }
  }
`;

// 좌우로 움직이는 애니메이션 정의
const moveSideToSide = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px); /* 좌우로 10px씩 움직이게 설정 */
  }
`;

// 페이드 업 애니메이션 정의
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 스타일드 컴포넌트 정의
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  .login-walk-img-section {
    background-color: #e6f2ff;
    flex: 1;
    .login-walk-img-wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        position: relative !important;
        width: 493px !important;
        height: 435px !important;
        animation: ${moveSideToSide} 2s infinite, ${fadeUp} 1s ease-out; /* 애니메이션 적용 */
      }
    }
  }
  .login-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .login-wrapper {
      width: 60%;
      min-width: 542px;
      animation: ${fadeUp} 1s ease-out; /* 애니메이션 적용 */
      .abc-walk101-logo-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        img {
        }
      }
      .title {
        font-size: 2rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        margin-bottom: 10%;
      }
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .id-wrapper {
          background-color: #fff;
          width: 100%;
          height: 40px;
          margin-bottom: 2rem;
          input {
            border: none;
            height: 100%;
            width: 100%;
            outline: none;
            padding: 1rem;
            border: solid 2px #ccc;
          }
          input:focus {
            border: solid 2px #1a4a9d;
          }
        }
        .password-wrapper {
          background-color: #fff;
          width: 100%;
          height: 40px;
          input {
            border: none;
            height: 100%;
            width: 100%;
            outline: none;
            padding: 1rem;
            border: solid 2px #ccc;
          }
          input:focus {
            border: solid 2px #1a4a9d;
          }
        }
        .persist-login-wrapper {
          width: 100%;
          font-size: 1.4rem;
          margin-top: 1.4rem;
          display: flex;
          align-items: center;
        }
        .login-btn-wrapper {
          width: 100%;
          margin-bottom: 1rem;
          margin-top: 10%;
          .login-btn {
            width: 100%;
            background-color: #1a4a9d;
            color: #fff;
            border: none;
            padding: 1.2rem 0;
            margin-top: 2rem;
            cursor: pointer;
            border-radius: 4px;
            font-size: 1.8rem;
          }
        }
      }
      .find-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.4rem;
        .find-text {
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .find-text:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }
      .find-wrap li + li::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: #d3d5d7;
        background-color: black;
        margin: 2px 15px 0;
        vertical-align: top;
      }
    }
    .copyright {
      position: absolute;
      bottom: 20px;
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    .login-walk-img-section {
      display: flex;
      justify-content: center;
      .login-walk-img-wrapper {
        width: 80%;
        img {
          position: relative !important;
        }
      }
    }
    .login-section {
      justify-content: space-between;
      align-items: center;
      .login-wrapper {
        flex: 1;
        margin-top: 3rem;
        .title {
          margin-bottom: 5%;
        }
        form {
          .id-wrapper {
            height: 4.5rem;
          }
          .password-wrapper {
            height: 4.5rem;
          }
          .login-btn-wrapper {
            margin-top: 5%;
          }
        }
      }
      .copyright {
        position: static;
        bottom: 0px;
        margin-top: 2rem;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .login-walk-img-section {
      .login-walk-img-wrapper {
        img {
          width: 80% !important;
          height: fit-content !important;
        }
      }
    }
    .login-section {
      justify-content: space-between;
      margin: 3rem 0;
      .login-wrapper {
        width: 90%;
        min-width: auto;
        margin: 3rem 0;
        .title {
          font-size: 1.6rem;
        }
        .abc-walk101-logo-wrapper {
          width: 100%;
          a {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          img {
            width: 70% !important;
            height: fit-content !important;
          }
        }
      }
      .copyright {
        width: 100%;
        display: flex;
        justify-content: center;
        bottom: 0;
        position: static;
        img {
          width: 70% !important;
          height: fit-content !important;
        }
      }
    }
  }
`;

// 로그인 컴포넌트 정의
const Login = () => {
  const router = useRouter();

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = useCallback(() => {
    router.push('/survey');
  }, [router]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <div className='login-walk-img-section'>
          <div className='login-walk-img-wrapper'>
            <Image src='/imgs/loginWalkImg.png' fill alt='loginWalkImg' />
          </div>
        </div>
        <div className='login-section'>
          <div className='login-wrapper'>
            <div className='abc-walk101-logo-wrapper'>
              <Link href='/'>
                <Image src='/imgs/abc-walk101Logo.png' width={426} height={56} alt='abc-walk101Logo' />
              </Link>
            </div>
            <div className='title'>
              <p>WALK101과 ABC-MART가 함께 하는 발목 솔루션 프로그램</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='id-wrapper'>
                <input placeholder='직원 아이디' />
              </div>
              <div className='password-wrapper'>
                <input placeholder='비밀번호' type='password' />
              </div>
              <div className='persist-login-wrapper'>
                <input id='persist-login' type='checkbox' />
                <label htmlFor='persist-login'>로그인 상태 유지하기</label>
              </div>
              <div className='login-btn-wrapper'>
                <button className='login-btn' onClick={handleLoginClick}>
                  로그인
                </button>
              </div>
            </form>
            <ul className='find-wrap'>
              <li className='find-text'>아이디 찾기</li>
              <li className='find-text'>비밀번호 찾기</li>
              <li className='find-text'>회원가입</li>
            </ul>
          </div>
        </div>
      </LoginContainer>
    </>
  );
};

export default Login;
