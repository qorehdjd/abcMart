import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ loading: boolean }>`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => (props.loading ? '#e0e0e0' : '#f0f4f8')}; /* 조건부 배경색 */
    color: #333;
    transition: background-color 0.3s ease; /* 부드러운 배경색 전환 */
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #4a90e2;
  text-align: center;
`;

const QuestionDisplay = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  background-color: #fff;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SubmitButton = styled.button`
  padding: 1.5rem 4rem;
  font-size: 1.5rem;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: #357ab8;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: left;
  font-size: 1.5rem;
  color: #333;
  animation: ${fadeIn} 0.5s ease-in-out;
  line-height: 1.8;

  h3 {
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    margin-left: 1.5rem;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    font-weight: bold;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const LoaderImage = styled.img`
  width: 250px; /* 원하는 크기로 설정 */
  height: 250px; /* 원하는 크기로 설정 */
`;

const GPTDiagnosis: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const question = `
    이 환자는 45세 여자입니다. 오른쪽 16.398도 무릎 내반 변형, 
    왼쪽 13.75도 외반 변형으로 인한 질병은 무엇인가요? 
    무릎 내반 또는 외반 변형의 정상 범위는 무엇입니까? 
    그리고 치료방법은 어떤 것들이 있습니까?
  `;

  const handleSubmit = async () => {
    setLoading(true);

    const detailedResult = `
      <h3>무릎 내반 변형(Genu Varum):</h3>
      <ul>
        <li>다리가 O자 형태로 굽어져 있는 상태입니다.</li>
        <li>일반적으로 5도 이내가 정상 범위로 간주되며, 16.398도는 이 범위를 초과한 변형으로 볼 수 있습니다.</li>
      </ul>

      <h3>무릎 외반 변형(Genu Valgum):</h3>
      <ul>
        <li>다리가 X자 형태로 굽어져 있는 상태입니다.</li>
        <li>정상 범위는 약 7도 이내로 간주되며, 13.75도는 이 범위를 초과한 변형으로 볼 수 있습니다.</li>
      </ul>

      <h3>가능한 질병:</h3>
      <ul>
        <li><strong>퇴행성 관절염(Osteoarthritis)</strong>: 무릎의 비정상적인 정렬로 인해 관절의 비정상적인 마모가 발생하여 퇴행성 관절염을 유발할 수 있습니다.</li>
        <li><strong>골 연골 이형성증(Osteochondrodysplasia)</strong>: 뼈의 성장 이상으로 인해 무릎의 변형이 생길 수 있습니다.</li>
        <li><strong>외상성 변형</strong>: 이전에 외상을 입었을 경우 뼈의 비정상적인 치유로 인해 발생할 수 있습니다.</li>
      </ul>

      <h3>치료 방법:</h3>
      <h4>1. 비수술적 치료:</h4>
      <ul>
        <li><strong>물리치료</strong>: 근력을 강화하고 자세를 교정하는 운동 프로그램을 통해 증상을 완화할 수 있습니다.</li>
        <li><strong>보조기 착용</strong>: 보조기를 착용하여 무릎의 정렬을 개선할 수 있습니다.</li>
        <li><strong>약물 치료</strong>: 통증 관리 및 염증 감소를 위해 NSAIDs와 같은 약물을 사용할 수 있습니다.</li>
      </ul>

      <h4>2. 수술적 치료:</h4>
      <ul>
        <li><strong>고강성 절골술(Osteotomy)</strong>: 뼈의 모양을 바로잡아 무릎의 정렬을 개선하는 수술입니다.</li>
        <li><strong>관절 교체술(Total Knee Arthroplasty)</strong>: 퇴행성 관절염이 심할 경우 무릎 관절을 인공관절로 대체하는 수술입니다.</li>
      </ul>

      <p>환자의 상태에 따라 적합한 치료 방법이 달라질 수 있으며, 정형외과 전문의와의 상담이 필요합니다.</p>
    `;

    setTimeout(() => {
      setResult(detailedResult);
      setLoading(false);
    }, 8000);
  };

  return (
    <>
      <GlobalStyle loading={loading} />
      <PageLayout>
        <Title>GPT 진단받기</Title>
        <QuestionDisplay>{question}</QuestionDisplay>
        <SubmitButton onClick={handleSubmit}>진단 시작</SubmitButton>
        {loading ? (
          <LoaderWrapper>
            <LoaderImage src='/imgs/loading.gif' alt='Loading...' />
          </LoaderWrapper>
        ) : (
          result && <ResultContainer dangerouslySetInnerHTML={{ __html: result }} />
        )}
      </PageLayout>
    </>
  );
};

export default GPTDiagnosis;
