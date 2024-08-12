import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Lottie from 'lottie-react';
import Modal from 'react-modal';
import emptyBoxAnimation from '../../empty-box.json'; // Lottie 애니메이션 파일 경로

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 850px) {
    html {
      font-size: 50%;
    }
  }
`;

const expand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    max-height: 1000px;
    opacity: 1;
    transform: scaleY(1);
  }
`;

const collapse = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0.8);
  }
`;

const ResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding-bottom: 20px;
  padding-top: 5%;
  min-height: 100vh;

  .result_section {
    height: 100%;
    width: 60%;
    max-width: 550px;
    font-size: 1.8rem;
    text-align: center;

    .logo {
      img {
        position: relative !important;
        width: 300px !important;
      }

      @media screen and (max-width: 450px) {
        img {
          width: 200px !important;
        }
      }
    }

    .text {
      font-weight: 600;
      font-size: 2rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .accordion {
      width: 100%;

      .accordion-item {
        background-color: #ffffff;
        margin-bottom: 1rem;
        cursor: pointer;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;

        .accordion-header {
          padding: 1rem;
          font-weight: 700;
          font-size: 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #4a90e2;
          color: #fff;
          border-bottom: 1px solid #ddd;
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: #357ab8;
          }

          span {
            font-size: 2.5rem;
            line-height: 1;
          }
        }

        .accordion-body {
          padding: 1.5rem;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          background-color: #f9f9f9;

          .result_wrapper {
            .imgs_wrapper {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 2rem;

              .img_wrapper {
                cursor: pointer;
                img {
                  position: relative !important;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
              }
            }
          }
        }

        .accordion-body.active {
          max-height: 1000px;
          opacity: 1;
          transform: scaleY(1);
        }
      }
    }
  }

  @media screen and (max-width: 850px) {
    .result_section {
      width: 90%;
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

  .chatgpt_button {
    margin-top: 2rem;
    padding: 2rem 4rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #fff;
    background-color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #000000be;
    }
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ModalImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 8px;
  }
`;

const Result = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleChatGPTButtonClick = () => {
    router.push('/gpt');
  };

  const sections = [
    {
      title: '발 내측',
      content: (
        <div className='imgs_wrapper'>
          <div className='img_wrapper' onClick={() => openModal('/imgs/result/inner/inner.jpg')}>
            <Image src='/imgs/result/inner/inner.jpg' fill alt='inner_foot_img1' />
          </div>
          <div className='img_wrapper' onClick={() => openModal('/imgs/result/inner/inner_result.jpg')}>
            <Image src='/imgs/result/inner/inner_result.jpg' fill alt='inner_foot_img2' />
          </div>
        </div>
      ),
    },
    { title: '발 외측', content: '' },
    { title: '발 뒤꿈치', content: '' },
    { title: '다리', content: '' },
    { title: '섹션5', content: '' },
    { title: '섹션6', content: '' },
    { title: '섹션7', content: '' },
  ];

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
          <p className='text'>고객님의 분석 결과를 확인 후, 알맞은 신발을 추천해주세요.</p>
          <div className='accordion'>
            {sections.map((section, index) => (
              <div key={index} className='accordion-item'>
                <div className='accordion-header' onClick={() => toggleAccordion(index)}>
                  {section.title}
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </div>
                <div className={`accordion-body ${activeIndex === index ? 'active' : ''}`}>
                  <div className='result_wrapper'>
                    {section.content ? (
                      section.content
                    ) : (
                      <EmptyContainer>
                        <Lottie animationData={emptyBoxAnimation} style={{ width: 200, height: 200 }} />
                      </EmptyContainer>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className='chatgpt_button' onClick={handleChatGPTButtonClick}>
            Chat GPT 진단받기
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Image Modal'
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
            content: {
              inset: '10%',
              padding: 0,
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <ModalImage>
            {selectedImage && (
              <Image
                src={selectedImage}
                layout='intrinsic'
                objectFit='contain'
                width={800}
                height={600}
                alt='Selected Image'
              />
            )}
          </ModalImage>
        </Modal>
      </ResultLayout>
    </>
  );
};

export default Result;
