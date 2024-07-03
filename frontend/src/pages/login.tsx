import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 600px) {
    html {
      font-size: 45%;
    }
  }
`;

const LoginLayout = styled.div`
  display: flex;
  height: 100vh;
  .loginWalkImg_section {
    background-color: #e6f2ff;
    flex: 1;
    .loginWalkImg_wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        position: relative !important;
        width: 493px !important;
        height: 435px !important;
      }
    }
  }
  .login_section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .login_wrapper {
      width: 60%;
      min-width: 542px;
      .abc-walk101Logo_wrapper {
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
        .id_wrapper {
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
        .password_wrapper {
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
        .persist_login_wrapper {
          width: 100%;
          font-size: 1.4rem;
          margin-top: 1.4rem;
          display: flex;
          align-items: center;
        }
        .login_btn_wrapper {
          width: 100%;
          margin-bottom: 1rem;
          margin-top: 10%;
          .login_btn {
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
      .find_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.4rem;
        .find_text {
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .find_text:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }
      .find_wrap li + li::before {
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
    .loginWalkImg_section {
      display: flex;
      justify-content: center;
      /* height: 50%; */
      .loginWalkImg_wrapper {
        width: 80%;
        img {
          position: relative !important;
        }
      }
    }
    .login_section {
      /* height: 50%; */
      justify-content: space-between;
      align-items: center;
      .login_wrapper {
        flex: 1;
        margin-top: 3rem;
        .title {
          margin-bottom: 5%;
        }
        form {
          .id_wrapper {
            height: 4.5rem;
          }
          .password_wrapper {
            height: 4.5rem;
          }
          .login_btn_wrapper {
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
    .loginWalkImg_section {
      .loginWalkImg_wrapper {
        img {
          width: 80% !important;
          height: fit-content !important;
        }
      }
    }
    .login_section {
      justify-content: space-between;
      margin: 3rem 0;
      .login_wrapper {
        width: 90%;
        min-width: auto;
        margin: 3rem 0;
        .title {
          font-size: 1.6rem;
        }
        .abc-walk101Logo_wrapper {
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

const Login = () => {
  const router = useRouter();

  const onClickLogin = useCallback(() => {
    router.push('/survey');
  }, []);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoginLayout>
        <div className='loginWalkImg_section'>
          <div className='loginWalkImg_wrapper'>
            <Image src='/imgs/loginWalkImg.png' fill alt='loginWalkImg' />
          </div>
        </div>
        <div className='login_section'>
          <div className='login_wrapper'>
            <div className='abc-walk101Logo_wrapper'>
              <Link href='/'>
                <Image src='/imgs/abc-walk101Logo.png' width={426} height={56} alt='abc-walk101Logo' />
              </Link>
            </div>
            <div className='title'>
              <p>WALK101과 ABC-MART가 함께 하는 발목 솔루션 프로그램</p>
            </div>
            <form onSubmit={onSubmit}>
              <div className='id_wrapper'>
                <input placeholder='직원 아이디' />
              </div>
              <div className='password_wrapper'>
                <input placeholder='비밀번호' type='password' />
              </div>
              <div className='persist_login_wrapper'>
                <input id='persist_login' type='checkbox' />
                <label htmlFor='persist_login'>로그인 상태 유지하기</label>
              </div>
              <div className='login_btn_wrapper'>
                <button className='login_btn' onClick={onClickLogin}>
                  로그인
                </button>
              </div>
            </form>
            <ul className='find_wrap'>
              <li className='find_text'>아이디 찾기</li>
              <li className='find_text'>비밀번호 찾기</li>
              <li className='find_text'>회원가입</li>
            </ul>
          </div>
          <div className='copyright'>
            <Image src='/imgs/copyright.png' width={380} height={23} alt='copyright' />
          </div>
        </div>
      </LoginLayout>
    </>
  );
};

export default Login;
