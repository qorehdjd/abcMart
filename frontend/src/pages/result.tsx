import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 850px) {
    html {
      font-size: 50%;
    }
  }
`;

const ResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* background-color: #fafafa; */
  padding-bottom: 20px;
  padding-top: 5%;
  .result_section {
    height: 100%;
    width: 60%;
    font-size: 1.8rem;
    text-align: center;
    .logo {
      img {
        position: relative !important;
        width: 40% !important;
        min-width: 300px;
      }
    }
    .text {
      font-weight: 600;
    }
    .btns_wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      button {
        background-color: #eaeaea;
        border: none;
        padding: 1rem 0;
        cursor: pointer;
      }
      .final_result {
        background-color: #1a4a9d;
        color: #ffffff;
        font-weight: 600;
      }
    }
    .result_wrapper {
      margin: 6rem 0;
      .imgs_wrapper {
        display: grid;
        margin-bottom: 5rem;
        grid-template-columns: 1fr 1fr 1fr;
        .img_wrapper {
          margin-right: 2rem;
          img {
            position: relative !important;
            border-radius: 8px;
          }
        }
      }
    }
    .recomment_shoes {
      .title_section {
        text-align: start;
        margin-bottom: 2rem;
        .title_wrapper {
          width: fit-content;
          display: flex;
          align-items: center;
          span {
            font-weight: 600;
            font-size: 2.5rem;
            margin-right: 1rem;
          }
        }
      }
      .shoes_wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        img {
          position: relative !important;
        }
        .shoe_wrapper {
          border-radius: 4px;
          width: 100%;
          img {
            width: 90% !important;
          }
        }
      }
    }
    .home_navi_btn_section {
      text-align: start;
      margin-top: 3rem;
      margin-bottom: 7rem;
      display: flex;
      align-items: center;
      .home_navi_btn_wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        svg {
          width: 3rem;
          height: 3rem;
          color: #1a4a9d;
          margin-right: 5px;
        }
        span {
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 850px) {
    .result_section {
      width: 90%;
      .recomment_shoes {
        .title_section {
          .title_wrapper {
            span {
              font-size: 2.1rem;
            }
            img {
              width: 20%;
              height: fit-content !important;
            }
          }
        }
      }
    }
    .copyright {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 55%;
        height: fit-content !important;
      }
    }
  }
`;

const Result = () => {
  const router = useRouter();

  const onClickHome = useCallback(() => {
    router.push('/');
  }, []);

  const onClickInsideFoot = useCallback(() => {
    router.push('/insideFoot');
  }, []);

  return (
    <>
      <GlobalStyle />
      <ResultLayout>
        <div className='result_section'>
          <div className='logo'>
            <Link href='/'>
              <Image src='/imgs/abc-walk101Logo.png' fill alt='abc-walk101Logo' />
            </Link>
          </div>
          <p className='text'>고객님의 분석 결과를 확인 후, 알맞는 신발을 추천해주세요.</p>
          <div className='btns_wrapper'>
            <button className='final_result'>최종 분석</button>
            <button onClick={onClickInsideFoot}>발 내측</button>
            <button>발 뒤꿈치</button>
            <button>다리 모양</button>
          </div>
          <div className='result_wrapper'>
            <h2>RESULT</h2>
            <div className='imgs_wrapper'>
              <div className='img_wrapper'>
                <Image src='/imgs/left_leg.png' fill alt='left_leg_img' />
              </div>
              <div className='img_wrapper'>
                <Image src='/imgs/right_leg.png' fill alt='right_leg_img' />
              </div>
              <div className='img_wrapper'>
                <Image src='/imgs/heel.png' fill alt='heel' />
              </div>
            </div>
            <p>
              고객님의 분석 결과는 아래와 같습니다.
              <br />
              <br />
              고객님은 발 내측이 평발의 가능성이 높으며
              <br />
              내측에 비해 뒤꿈치는 매우 안정적인 상태에 속하고 있습니다.
            </p>
          </div>
          <div className='recomment_shoes'>
            <div className='title_section'>
              <div className='title_wrapper'>
                <span>추천 운동화</span>
                <Image src='/imgs/thumb.png' width={80} height={55} alt='thumb' />
              </div>
            </div>
            <div className='shoes_wrapper'>
              <div className='shoe_wrapper'>
                <Image src='/imgs/shoes01.png' fill alt='shoes' />
              </div>
              <div className='shoe_wrapper'>
                <Image src='/imgs/shoes02.png' fill alt='shoes' />
              </div>
              <div className='shoe_wrapper'>
                <Image src='/imgs/shoes03.png' fill alt='shoes' />
              </div>
              <div className='shoe_wrapper'>
                <Image src='/imgs/shoes04.png' fill alt='shoes' />
              </div>
            </div>
          </div>
          <div className='home_navi_btn_section'>
            <div className='home_navi_btn_wrapper' onClick={onClickHome}>
              <GoArrowLeft />
              <span>처음으로</span>
            </div>
          </div>
        </div>
        {/* <div className='copyright'>
          <Image src='/imgs/copyright.png' width={380} height={23} alt='copyright' />
        </div> */}
      </ResultLayout>
    </>
  );
};

export default Result;
