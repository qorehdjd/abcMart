import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 1000px) {
    html {
      font-size: 50%;
    }
  }
`;

const PictureLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  .picture_section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .picture_wrapper {
      display: flex;
      .left_wrapper {
        position: relative;
        margin-right: 7rem;
        width: 50%;
        .title_wrapper {
          h1 {
            font-size: 3rem;
          }
          .deco {
            background-color: #459cff;
            height: 3px;
            width: 25%;
          }
        }
        p {
          font-size: 1.8rem;
          color: #777;
          margin: 7rem 0;
        }
        .analysis_btn_wrapper {
          button {
            background-color: #1a4a9d;
            color: #ffffff;
            border-radius: 10px;
            border: none;
            font-size: 1.4rem;
            padding: 10px 50px;
            cursor: pointer;
            font-weight: 600;
          }
        }
        .prev_btn_wrapper {
          font-size: 2rem;
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 10px;
          cursor: pointer;
          span {
            font-weight: 600;
          }
          svg {
            color: #1a4a9d;
            width: 3rem;
            height: 3rem;
            margin-right: 5px;
          }
        }
      }
      .right_wrapper {
        width: 50%;
        img {
          position: relative !important;
        }
        .imgs_section {
          display: flex;
          flex-direction: column;
          .leg_imgs_section {
            display: flex;
            margin-bottom: 2rem;
            width: 100%;
            .leg_img_wrapper {
              width: 50%;
            }
            .leg_img_wrapper.margin {
              margin-right: 2rem;
            }
          }
          .heel_imgs_section {
            display: flex;
            margin-bottom: 2rem;
            width: 100%;
            .heel_img_wrapper {
              width: 50%;
            }
            .heel_img_wrapper.margin {
              margin-right: 2rem;
            }
          }
          .knee-ankle_img_section {
            display: flex;
            width: 100%;
            .knee-ankle_img_wrapper {
              width: 100%;
            }
          }
        }
      }
      .responsive800-show {
        display: none;
      }
    }
    .copyright {
      position: absolute;
      bottom: 20px;
    }
  }
  @media screen and (max-width: 800px) {
    height: auto;
    .picture_section {
      width: 100%;
      .picture_wrapper {
        flex-direction: column;
        align-items: center;
        width: 80%;
        .left_wrapper {
          width: 100%;
          margin-right: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          .title_wrapper {
            .deco {
              width: 100%;
            }
          }
          .responsive800-hide {
            display: none;
          }
        }
        .right_wrapper {
          width: 100%;
        }
        .responsive800-show {
          display: block;
        }
        .resp-prev_btn_wrapper {
          font-size: 2rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-align: start;
          margin: 2rem 0;
          width: 100%;
          cursor: default;
          .resp-prev_btn_wrapper_wrapper {
            cursor: pointer;
            display: flex;
            align-items: center;
            span {
              font-weight: 600;
            }
            svg {
              color: #1a4a9d;
              width: 3rem;
              height: 3rem;
              margin-right: 5px;
            }
          }
        }
        .resp-analysis_btn_wrapper {
          margin: 5rem 0;
          button {
            background-color: #1a4a9d;
            color: #ffffff;
            border-radius: 40px;
            border: none;
            font-size: 1.8rem;
            padding: 10px 50px;
            cursor: pointer;
            font-weight: 600;
          }
        }
      }
    }
    .copyright {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 70%;
        height: fit-content !important;
      }
    }
  }
`;

const Picture = () => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickPrev = useCallback(() => {
    router.push('/survey');
  }, []);

  const onClickAnalysis = useCallback(() => {
    // fileRef.current?.click();
    router.push('/analyze');
  }, []);

  return (
    <>
      <GlobalStyle />
      <PictureLayout>
        <div className='picture_section'>
          <div className='picture_wrapper'>
            <div className='left_wrapper'>
              <div className='title_wrapper'>
                <h1>TAKE A PICTURE</h1>
                <div className='deco'></div>
              </div>
              <p>
                사진 촬영 시, 고객님의 왼발과 오른발, 무릎이 전부 나올 수 있도록
                <br />
                카메라를 지면과 수평으로 놓고 거리를 조절하여 촬영해주세요.
                <br />
                반드시 양말은 벗고, 바지는 무릎 위까지 걷어야 하며 사물이 없는 곳에서
                <br />
                촬영하면 더욱 정확한 결과를 알 수 있어요.
              </p>
              <div className='analysis_btn_wrapper responsive800-hide'>
                <button onClick={onClickAnalysis}>분석하기</button>
              </div>
              <input type='file' id='file' accept='.jpg, .png' ref={fileRef} style={{ display: 'none' }} />
              <div className='prev_btn_wrapper responsive800-hide' onClick={onClickPrev}>
                <GoArrowLeft />
                <span>이전으로</span>
              </div>
            </div>
            <div className='right_wrapper'>
              <div className='imgs_section'>
                <div className='leg_imgs_section'>
                  <div className='leg_img_wrapper margin'>
                    <Image src='/imgs/picture/left-foot.png' alt='left-foot' fill />
                  </div>
                  <div className='leg_img_wrapper'>
                    <Image src='/imgs/picture/right-foot.png' alt='right-foot' fill />
                  </div>
                </div>
                <div className='heel_imgs_section'>
                  <div className='heel_img_wrapper margin'>
                    <Image src='/imgs/picture/left-heel.png' alt='left-heel' fill />
                  </div>
                  <div className='heel_img_wrapper'>
                    <Image src='/imgs/picture/right-heel.png' alt='right-heel' fill />
                  </div>
                </div>
                <div className='knee-ankle_img_section'>
                  <div className='knee-ankle_img_wrapper'>
                    <Image src='/imgs/picture/knee-ankle.png' alt='knee-ankle' fill />
                  </div>
                </div>
              </div>
            </div>
            <div className='resp-prev_btn_wrapper responsive800-show'>
              <div className='resp-prev_btn_wrapper_wrapper' onClick={onClickPrev}>
                <GoArrowLeft />
                <span>이전으로</span>
              </div>
            </div>
            <div className='resp-analysis_btn_wrapper responsive800-show'>
              <button onClick={onClickAnalysis}>분석하기</button>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <Image src='/imgs/copyright.png' width={380} height={23} alt='copyright' />
        </div>
      </PictureLayout>
    </>
  );
};

export default Picture;
