import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
  padding: 40px 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 1024px) {
    /* font-size: 2.5rem; */
  }

  @media (max-width: 768px) {
    /* font-size: 2rem; */
  }
`;

const Section = styled.div`
  width: 100%;
  max-width: 550px;
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.6rem;
  color: #334e68;
  margin-bottom: 20px;
  white-space: nowrap;

  @media (max-width: 1024px) {
    /* font-size: 2.2rem; */
  }

  @media (max-width: 768px) {
    /* font-size: 1.8rem; */
  }
`;

const SectionContent = styled.p`
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 25px;
  line-height: 1.8;

  @media (max-width: 1024px) {
    /* font-size: 1.5rem; */
  }

  @media (max-width: 768px) {
    /* font-size: 1.3rem; */
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  aspect-ratio: 660 / 858;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BackButton = styled(Link)`
  background: #007bff;
  color: #ffffff;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  margin-top: 30px;
  text-decoration: none;
  transition: background-color 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    /* font-size: 1.2rem; */
  }
`;

const GuidePage: React.FC = () => {
  const guideSections = [
    {
      title: '평발 가이드',
      description: '평발 사진을 촬영할 때에는 발바닥이 평평한 모습이 잘 드러나도록 발을 곧게 세우고 찍어주세요.',
      imageSrc: '/imgs/test/test02.jpg',
    },
    {
      title: '발목 불안정성 가이드',
      description: '발목의 불안정성을 확인하기 위해 발을 뒤에서 찍어주세요',
      imageSrc: '/imgs/test/test05.jpg',
    },
    {
      title: '무지외반증 가이드',
      description:
        '무지외반증의 상태를 확인하기 위해 발의 상부를 촬영하며, 엄지와 발가락의 각도가 잘 보이게 찍어주세요.',
      imageSrc: '/imgs/test/test06.jpg',
    },
    {
      title: '하지 정렬 가이드',
      description: '하지 정렬 사진을 촬영할 때에는 발을 약 20cm 정도 벌리고, 무릎이 모두 나오도록 정면에서 찍어주세요.',
      imageSrc: '/imgs/test/test01.jpg',
    },
  ];

  return (
    <Container>
      <Title>촬영 가이드라인</Title>
      {guideSections.map((section, index) => (
        <Section key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          <SectionContent>{section.description}</SectionContent>
          <ImageWrapper>
            <StyledImage src={section.imageSrc} alt={`${section.title} 예시`} width={660} height={858} unoptimized />
          </ImageWrapper>
        </Section>
      ))}
      <BackButton href='/analyze'>분석 페이지로 이동</BackButton>
    </Container>
  );
};

export default GuidePage;
