import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
// import supabase from '../utils/supabaseClient'; // Supabase 클라이언트 초기화 파일을 만드세요.

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 700px) {
    html {
      font-size: 50%;
    }
  }
`;

const runAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(50px); }
`;

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

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  .login-walk-img-section {
    display: flex;
    justify-content: center;
    padding: 30px;
    background-color: #e6f2ff;
    .login-walk-img-wrapper {
      width: 50%;
      max-width: 500px;
      min-width: 400px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        animation: ${runAnimation} 1s infinite alternate ease-in-out, ${fadeUp} 1s ease-out;
      }
    }
  }
  .login-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-wrapper {
      width: 60%;
      min-width: 542px;
      max-width: 700px;
      animation: ${fadeUp} 1s ease-out;
      .abc-walk101-logo-wrapper {
        display: flex;
        justify-content: center;
      }
      .title {
        font-size: 2rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        margin-bottom: 10%;
      }
      .social-login-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 700px;
        button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1.2rem;
          border: none;
          border-radius: 4px;
          font-size: 1.6rem;
          cursor: pointer;
          justify-content: center;
          img {
            margin-right: 7px;
          }
        }
        .google {
          background-color: #4285f4;
          color: white;
        }
        .apple {
          background-color: #000000;
          color: white;
        }
        .kakao {
          background-color: #fee500;
          color: #000000;
        }
      }
    }
  }
  @media (max-width: 1240px) {
    grid-template-columns: 1fr; /* 1열로 변경 */
    grid-template-rows: 1fr 1fr; /* 세로 레이아웃 */
    .login-walk-img-section {
      display: flex;
      justify-content: center;
      padding: 30px;
      background-color: #e6f2ff;
      .login-walk-img-wrapper {
        width: 30%;
        /* max-width: 500px; */
        /* min-width: auto; */
        height: auto;
      }
    }
    .login-section {
      justify-content: flex-start;
      margin-top: 7rem;
      .login-wrapper {
        width: 80%;
        min-width: auto;
        max-width: 700px;
        .abc-walk101-logo-wrapper {
          a {
            width: 50%;
          }
        }
        .title {
          font-size: 2.3rem;
          margin-bottom: 5%;
        }
        .social-login-buttons {
          display: flex;
          flex-direction: column;
          max-width: 700px;
          button {
            width: 100%;
            padding: 1rem;
            border-radius: 4px;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            img {
              margin-right: 7px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr; /* 1열로 변경 */
    grid-template-rows: 1fr 1fr; /* 세로 레이아웃 */
    .login-walk-img-section {
      display: flex;
      justify-content: center;
      padding: 30px;
      background-color: #e6f2ff;
      .login-walk-img-wrapper {
        width: 60%;
        /* max-width: 500px; */
        min-width: auto;
        height: auto;
      }
    }
    .login-section {
      justify-content: flex-start;
      margin-top: 7rem;
      .login-wrapper {
        width: 80%;
        min-width: auto;
        max-width: 700px;
        .abc-walk101-logo-wrapper {
          a {
            width: 80%;
          }
        }
        .title {
          font-size: 2rem;
          margin-bottom: 5%;
        }
        .social-login-buttons {
          display: flex;
          flex-direction: column;
          max-width: 700px;
          button {
            width: 100%;
            padding: 1.4rem;
            border-radius: 4px;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            img {
              margin-right: 7px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr; /* 1열로 변경 */
    grid-template-rows: 1fr 1fr; /* 세로 레이아웃 */
    .login-walk-img-section {
      display: flex;
      justify-content: center;
      padding: 30px;
      background-color: #e6f2ff;
      .login-walk-img-wrapper {
        width: 80%;
        /* max-width: 500px; */
        min-width: auto;
        height: auto;
      }
    }
    .login-section {
      justify-content: flex-start;
      margin-top: 7rem;
      .login-wrapper {
        /* width: 70%; */
        min-width: auto;
        max-width: 700px;
        .abc-walk101-logo-wrapper {
          a {
            width: 80%;
          }
        }
        .title {
          font-size: 1.4rem;
          margin-bottom: 5%;
        }
        .social-login-buttons {
          display: flex;
          flex-direction: column;
          max-width: 700px;
          button {
            width: 100%;
            padding: 1.4rem;
            border-radius: 4px;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            img {
              margin-right: 7px;
            }
          }
        }
      }
    }
  }
`;

const Login: React.FC = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const { subscription } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === 'SIGNED_IN') {
  //       // 로그인 성공 시 URL 클리닝
  //       const cleanUrl = window.location.origin + router.pathname;
  //       window.history.replaceState(null, '', cleanUrl);

  //       console.log('User signed in:', session);
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe(); // 메모리 누수 방지
  //   };
  // }, [router]);

  // const handleSocialLogin = async (provider: 'google' | 'apple' | 'kakao') => {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider,
  //       options: {
  //         redirectTo: 'http://localhost:3000/survey', // 리다이렉션 URL 설정
  //         queryParams: {
  //           access_type: 'offline',
  //           prompt: 'consent',
  //         },
  //       },
  //     });
  //     if (error) throw error;
  //     console.log('Redirecting...');
  //   } catch (err) {
  //     console.error('Social Login Error:', err);
  //   }
  // };

  const onClick = useCallback(() => {
    router.push('survey');
  }, []);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data } = await supabase.auth.getUser();
  //     if (data?.user) {
  //       router.push('/dashboard'); // 로그인 성공 시 리다이렉트 경로
  //     }
  //   };
  //   checkUser();
  // }, [router]);

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <div className='login-walk-img-section'>
          <div className='login-walk-img-wrapper'>
            <Image src='/imgs/running-img.svg' alt='loginWalkImg' layout='responsive' width={493} height={435} />
          </div>
        </div>
        <div className='login-section'>
          <div className='login-wrapper'>
            <div className='abc-walk101-logo-wrapper'>
              <Link href='/'>
                <Image src='/imgs/logo.svg' width={426} height={56} layout='responsive' alt='abc-walk101Logo' />
              </Link>
            </div>
            <div className='title'>
              <p>WALK101과 ABC마트가 함께 하는 발목 솔루션 프로그램</p>
            </div>
            <div className='social-login-buttons'>
              <button className='google' onClick={() => onClick()}>
                <Image src='/svg/google.svg' alt='Google Logo' width={20} height={20} />
                Google로 로그인
              </button>
              <button className='kakao' onClick={() => onClick()}>
                <Image src='/svg/kakao.svg' alt='Kakao Logo' width={20} height={20} />
                Kakao로 로그인
              </button>
              <button className='apple' onClick={() => onClick()}>
                <Image src='/svg/apple.svg' alt='Apple Logo' width={20} height={20} />
                Apple로 로그인
              </button>
            </div>
          </div>
        </div>
      </LoginContainer>
    </>
  );
};

export default Login;
