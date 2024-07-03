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

const InsideFootLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* background-color: #fafafa; */
  padding-top: 5%;
  padding-bottom: 20px;
  .insideFoot_section {
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
      .click {
        background-color: #1a4a9d;
        color: #ffffff;
        font-weight: 600;
      }
    }
    .legs_img_section {
      display: flex;
      justify-content: center;
      margin: 7rem 0;
      .legs_img_wrapper {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        img {
          position: relative !important;
        }
        .name {
          font-weight: 600;
        }
      }
    }
    .affluence_img_wrapper {
      margin: 6rem 0;
      img {
        position: relative !important;
      }
    }
    .result_section {
      .imgs_section {
        display: flex;
        justify-content: center;
        margin: 7rem 0;
        .left {
          margin-right: 2rem;
        }
        .img_wrapper {
          display: flex;
          flex-direction: column;
          width: 50%;
          img {
            border-radius: 10px;
            position: relative !important;
            margin-bottom: 1rem;
          }
        }
      }
    }
    .home_navi_btn_section {
      display: flex;
      margin: 8rem 0;
      .home_navi_btn_wrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
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
    .insideFoot_section {
      width: 90%;
      .legs_img_section {
        width: 100%;
        .legs_img_wrapper {
          min-width: auto;
          width: 33.3%;
          img {
            width: 100% !important;
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

const InsideFoot = () => {
  const router = useRouter();

  const onClickFinalAnalysis = useCallback(() => {
    router.push('/result');
  }, []);

  const onClickHome = useCallback(() => {
    router.push('/');
  }, []);

  return (
    <>
      <GlobalStyle />
      <InsideFootLayout>
        <div className='insideFoot_section'>
          <div className='logo'>
            <Link href='/'>
              <Image src='/imgs/abc-walk101Logo.png' fill alt='abc-walk101Logo' />
            </Link>
          </div>
          <p className='text'>고객님의 분석 결과를 확인 후, 알맞는 신발을 추천해주세요.</p>
          <div className='btns_wrapper'>
            <button className='final_result' onClick={onClickFinalAnalysis}>
              최종 분석
            </button>
            <button className='click'>발 내측</button>
            <button>발 뒤꿈치</button>
            <button>다리 모양</button>
          </div>
          <div className='legs_img_section'>
            <div className='legs_img_wrapper'>
              <Image src='/imgs/평발.png' fill alt='평발' />
              <div className='name'>평발</div>
            </div>
            <div className='legs_img_wrapper'>
              <Image src='/imgs/정상발.png' fill alt='정상발' />
              <div className='name'>정상 발</div>
            </div>
            <div className='legs_img_wrapper'>
              <Image src='/imgs/요족.png' fill alt='요족' />
              <div className='name'>요족</div>
            </div>
          </div>
          <div className='text_wrapper'>
            <h1>요족이란?</h1>
            <p>
              요족은 <span style={{ color: '#1A4A9D' }}>발등이 정상보다 높이 올라오는 상태를</span> 의미합니다.
              <br />
              발바닥의 아치가 높아 옆에서 보았을 때<br />
              발바닥이 위로 높게 올라온 상태를 말하며 아치가 높기에
              <br />
              체중이 발바닥에 고르게 분산되지 못해
              <br />발 뒤꿈치와 발 앞쪽에 쏠려 여러 통증을 불러올 수 있습니다.
            </p>
          </div>
          <div className='affluence_img_wrapper'>
            <Image src='/imgs/affluence-leg.png' alt='affluence-leg' fill />
          </div>
          <div className='result_section'>
            <h1>RESULT</h1>
            <div className='imgs_section'>
              <div className='img_wrapper left'>
                <Image src='/imgs/left_leg.png' fill alt='left-leg' />
                <div style={{ fontWeight: '600' }}>
                  왼발 각도: <span style={{ position: 'relative', top: '-2px' }}>[ ]</span>도
                </div>
              </div>
              <div className='img_wrapper'>
                <Image src='/imgs/right_leg.png' fill alt='right-leg' />
                <div style={{ fontWeight: '600' }}>
                  오른발 각도: <span style={{ position: 'relative', top: '-2px' }}>[ ]</span>도
                </div>
              </div>
            </div>
            <p>
              OOO님은 왼쪽 발은 <span style={{ position: 'relative', top: '-2px' }}>[ ]</span> 각도로
              <br />
              정상 발의 범주에서 벗어나 요족의 형태에 가까우며
              <br />
              우측은 <span style={{ position: 'relative', top: '-2px' }}>[ ]</span> 각도로 정상 발의 범주와
              <br />
              매우 가깝지만 약간 들어져 요족의 형태를 보입니다.
              <br />
              <br />
              단, 본 결과는 범위의 오차가 있을 수 있으니
              <br />
              정확한 검진을 위해서는 병원 방문을 적극 권고드립니다.
            </p>
          </div>
          <div className='home_navi_btn_section'>
            <div className='home_navi_btn_wrapper' onClick={onClickHome}>
              <GoArrowLeft />
              <span>처음으로</span>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <Image src='/imgs/copyright.png' width={380} height={23} alt='copyright' />
        </div>
      </InsideFootLayout>
    </>
  );
};

export default InsideFoot;
