import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

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

const moveUpAndDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50px);
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
  @media screen and (max-width: 1200px) {
    html {
      font-size: 55%;
    }
  }
  @media screen and (max-width: 850px) {
    html {
      font-size: 50%;
    }
  }
  @media screen and (max-width: 700px) {
    html {
      font-size: 40%;
    }
  }
`;

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  .text-section {
    height: 50%;
    background-color: #fafafa;
    opacity: 0;
    transform: translateY(20px);
    animation: ${fadeUp} 1s forwards 0.5s;
    z-index: 200;
    .text-wrapper {
      padding-left: 28rem;
      padding-top: 9rem;

      h1 {
        font-size: 7rem;
        font-weight: 600;
      }

      p {
        font-size: 2rem;
      }

      button {
        background-color: #3950a0;
        color: white;
        border: none;
        padding: 1rem 4rem;
        border-radius: 25px;
        font-size: 2rem;
        margin-top: 11rem;
        z-index: 10;
        cursor: pointer;
        position: relative;
        font-weight: 600;
      }
    }
  }

  .shoe-img-section {
    height: 50%;
    background-color: #e6f2ff;
    display: flex;
    justify-content: end;

    .shoe-img-wrapper {
      position: relative;
      margin-right: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      transform: translateY(20px);
      animation: ${fadeUp} 1s forwards 1s;

      .shoes-img {
        animation: ${moveUpAndDown} 2s infinite;
      }

      .responsive1000-show {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .text-section {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 600;

      .text-wrapper {
        padding: 0;
      }

      .responsive1000-hide {
        display: none;
      }
    }

    .shoe-img-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;

      .shoe-img-wrapper {
        height: 100%;
        position: relative;
        margin-right: 0;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transform: translateY(20px);
        animation: ${fadeUp} 1s forwards 1s;

        .shoes-img {
          width: 100% !important;
          height: fit-content !important;
          animation: ${moveUpAndDown} 2s infinite;
        }

        .responsive1000-show {
          display: block;
          background-color: #3950a0;
          color: white;
          border: none;
          width: 100%;
          padding: 1.5rem 8rem;
          border-radius: 25px;
          font-size: 2rem;
          cursor: pointer;
          position: relative;
          font-weight: 600;
          margin-top: 12rem;
          z-index: 10;
          animation: none; /* 버튼 애니메이션 제거 */
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .text-section {
      .text-wrapper {
        width: 90%;
      }
    }

    .shoe-img-section {
      .shoe-img-wrapper {
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .text-section {
      .text-wrapper {
        h1 {
          font-size: 5rem;
        }
      }
    }
  }
`;

const Home = () => {
  const router = useRouter();

  const handleLoginClick = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <div className='text-section'>
          <div className='text-wrapper'>
            <h1>
              Let&#39;s until
              <br />
              we&#39;re 100 years old!
            </h1>
            <p>
              신발을 신고 걸을 때마다 항상 아팠던 여러분의 발,
              <br />
              WALK101과 ABC 마트가 여러분의 발에 맞는 신발을 찾아드립니다.
            </p>
            <button className='responsive1000-hide' onClick={handleLoginClick}>
              시작하기
            </button>
          </div>
        </div>
        <div className='shoe-img-section'>
          <div className='shoe-img-wrapper'>
            <Image className='shoes-img' src='/imgs/main-shoes.png' width={600} height={452} alt='shoes' />
            <button className='responsive1000-show' onClick={handleLoginClick}>
              시작하기
            </button>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default Home;
