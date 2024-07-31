import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 600px) {
    html {
      font-size: 40%;
    }
  }
`;

const SurveyContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .survey-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: fit-content;
    animation: fadeUp 1s ease-out;

    .title {
      color: #777;
      text-align: center;
      margin-bottom: 5rem;
    }

    .survey-image {
      display: flex;
      justify-content: center;
      img {
        width: 109px;
        height: 121px;
        animation: bounce 2s infinite;
      }
    }

    .logo {
      display: flex;
      justify-content: center;
      img {
        width: 380px;
        height: 50px;
      }
    }

    ul {
      width: 100%;
      li {
        display: flex;
        width: 100%;
        border: solid 2px rgba(204, 204, 204, 0.8);
        background-color: #fff;
        justify-content: space-between;
        margin-bottom: 10px;
        color: #777;
        align-items: center;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        animation: fadeUp 1s ease-out;

        &:hover,
        &.selected {
          border: solid 2px #1a4a9d;
          color: #1a4a9d;
          font-weight: 600;
        }
      }
    }

    .next-button-section {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1rem;
      animation: fadeUp 1s ease-out;

      .next-button {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          font-weight: 600;
          margin-right: 6px;
        }

        svg {
          color: #1a4a9d;
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .survey-wrapper {
      width: 90%;

      .survey-image {
        width: 100%;
        justify-content: center;
        img {
          width: 25%;
          height: fit-content !important;
        }
      }

      .logo {
        width: 100%;
        justify-content: center;
        a {
          display: flex;
          justify-content: center;
          img {
            width: 80%;
            height: fit-content !important;
          }
        }
      }

      .title {
        margin-bottom: 5rem;
      }

      .next-button-section {
        .next-button {
          svg {
            width: 3rem;
            height: 3rem;
          }
        }
      }
    }
  }
`;

const Survey = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  const handleItemClick = useCallback((index: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(index)
        ? prevSelectedItems.filter((item) => item !== index)
        : [...prevSelectedItems, index],
    );
  }, []);

  const handleNextClick = useCallback(() => {
    router.push('/picture');
  }, [router]);

  const surveyItems = [
    '신발을 신을 때 발목에 통증이 심하다',
    '오래 걸으면 발과 발목이 아프기 시작한다',
    '신발이 맞지 않아 불편함이 자주 생긴다',
    '내 발에 맞는 사이즈와 신발을 찾기 힘들다',
  ];

  return (
    <>
      <GlobalStyle />
      <SurveyContainer>
        <div className='survey-wrapper'>
          <div className='survey-image'>
            <Image src='/imgs/survey.png' width={109} height={121} alt='Survey Image' />
          </div>
          <div className='logo'>
            <Link href='/'>
              <Image src='/imgs/abc-walk101Logo.png' width={380} height={50} alt='ABC Walk101 Logo' />
            </Link>
          </div>
          <div className='title'>
            WALK101과 ABC-MART와 함께 고객님의 발과 발목의 상태를
            <br />
            더욱 쉽고 명확하게 분석해보세요!
          </div>
          <ul>
            {surveyItems.map((item, index) => (
              <li
                key={index}
                className={selectedItems.includes(index) ? 'selected' : ''}
                onClick={() => handleItemClick(index)}
              >
                <div>{item}</div>
                {selectedItems.includes(index) ? <FaCheckSquare /> : <FaRegCheckSquare />}
              </li>
            ))}
          </ul>
          <div className='next-button-section'>
            <div className='next-button' onClick={handleNextClick}>
              <span>다음으로</span>
              <GoArrowRight />
            </div>
          </div>
        </div>
      </SurveyContainer>
    </>
  );
};

export default Survey;
