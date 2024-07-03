import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
// import { Inter } from 'next/font/google';
import styled, { createGlobalStyle } from 'styled-components';

// const inter = Inter({ subsets: ['latin'] });

const GlobalStyle = createGlobalStyle`
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

const HomeLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  .text_section {
    height: 50%;
    background-color: #fafafa;
    .text_wrapper {
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
        z-index: 10000;
        cursor: pointer;
        position: relative;
        font-weight: 600;
      }
    }
  }
  .shoeImg_section {
    height: 50%;
    background-color: #e6f2ff;
    display: flex;
    justify-content: end;
    .shoeImg_wrapper {
      position: relative;
      margin-right: 20%;
      .shoesImg {
      }
      .responsive1000-show {
        display: none;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .text_section {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 600;
      .text_wrapper {
        padding: 0;
      }
      .responsive1000-hide {
        display: none;
      }
    }
    .shoeImg_section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .shoeImg_wrapper {
        height: 100%;
        position: relative;
        margin-right: 0;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .shoesImg {
          width: 100% !important;
          height: fit-content !important;
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
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .text_section {
      .text_wrapper {
        width: 90%;
      }
    }
    .shoeImg_section {
      .shoeImg_wrapper {
        width: 70%;
      }
    }
  }
  @media screen and (max-width: 700px) {
    .text_section {
      .text_wrapper {
        h1 {
          font-size: 5rem;
        }
      }
    }
  }
`;

const Home = () => {
  const router = useRouter();

  const onClickLogin = useCallback(() => {
    router.push('/login');
  }, []);

  return (
    <>
      {/* <Head>
        <title>abcMart</title>
        <meta name='description' content='abcMMart' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <GlobalStyle />
      <HomeLayout>
        <div className='text_section'>
          <div className='text_wrapper'>
            <h1>
              Let&#39;s untill
              <br />
              we&#39;re 100 years old!
            </h1>
            <p>
              신발을 신고 걸을 때마다 항상 아팠던 여러분의 발,
              <br />
              WALK101과 ABC 마트가 여러분의 발에 맞는 신발을 찾아드립니다.
            </p>
            <button className='responsive1000-hide' onClick={onClickLogin}>
              시작하기
            </button>
          </div>
        </div>
        <div className='shoeImg_section'>
          <div className='shoeImg_wrapper'>
            <Image className='shoesImg' src='/imgs/main-shoes.png' width={600} height={452} alt='shoes' />
            <button className='responsive1000-show' onClick={onClickLogin}>
              시작하기
            </button>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Home;
