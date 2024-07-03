import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 600px) {
    html {
      font-size: 40%;
    }
  }
`;

const SurveyLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  .survey_wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: fit-content;
    .title_wrapper {
      color: #777;
      text-align: center;
      margin-bottom: 5rem;
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
      }
      li:hover {
        border: solid 2px #1a4a9d;
        color: #1a4a9d;
        font-weight: 600;
      }
    }
    .next_btn_section {
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      margin-top: 1rem;
      .next_btn_wrapper {
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
    .survey_wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      width: 90%;
      .survey_img_wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        img {
          width: 25%;
          height: fit-content !important;
        }
      }
      .logo_wrapper {
        width: 100%;
        a {
          display: flex;
          justify-content: center;
          img {
            width: 80%;
            height: fit-content !important;
          }
        }
      }
      .title_wrapper {
        color: #777;
        text-align: center;
        margin-bottom: 5rem;
      }
      .next_btn_section {
        .next_btn_wrapper {
          svg {
            color: #1a4a9d;
            width: 3rem;
            height: 3rem;
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

const Survey = () => {
  const router = useRouter();
  const onClickNext = useCallback(() => {
    router.push('/picture');
  }, []);

  return (
    <>
      <GlobalStyle />
      <SurveyLayout>
        <div className='survey_wrapper'>
          <div className='survey_img_wrapper'>
            <Image src='/imgs/survey.png' width={109} height={121} alt='surveyImg' />
          </div>
          <div className='logo_wrapper'>
            <Link href='/'>
              <Image src='/imgs/abc-walk101Logo.png' width={380} height={50} alt='abc-walk101Logo' />
            </Link>
          </div>
          <div className='title_wrapper'>
            WALK101과 ABC-MART와 함께 고객님의 발과 발목의 상태를
            <br />
            더욱 쉽고 명확하게 분석해보세요!
          </div>
          <ul>
            <li>
              <div>신발을 신을 때 발목에 통증이 심하다</div>
              <FaRegCheckSquare />
            </li>
            <li>
              <div>오래 걸으면 발과 발목이 아프기 시작한다</div>
              <FaRegCheckSquare />
            </li>
            <li>
              <div>신발이 맞지 않아 불편함이 자주 생긴다</div>
              <FaRegCheckSquare />
            </li>
            <li>
              <div>내 발에 맞는 사이즈와 신발을 찾기 힘들다</div>
              <FaRegCheckSquare />
            </li>
          </ul>
          <div className='next_btn_section'>
            <div className='next_btn_wrapper' onClick={onClickNext}>
              <span>다음으로</span>
              <GoArrowRight />
            </div>
          </div>
        </div>
        {/* <div className='copyright'>
          <Image src='/imgs/copyright.png' width={380} height={23} alt='copyright' />
        </div> */}
      </SurveyLayout>
    </>
  );
};

export default Survey;
