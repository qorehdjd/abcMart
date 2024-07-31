import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 20px;
  transition: background-color 0.5s ease;

  @media (max-width: 768px) {
    padding: 10px;
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

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #334e68;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  animation: ${slideIn} 0.5s ease-in-out;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    padding: 10px;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 400px;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
    justify-content: flex-start;
  }
`;

const ExampleContainer = styled.div`
  background-color: #f6f9fc;
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    height: 250px;
    width: 150px;
  }
`;

const ExampleImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ExampleLabel = styled.div`
  font-size: 16px;
  color: #627d98;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 14px;
    height: 30px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 400px;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
    justify-content: flex-start;
  }
`;

const UploadArea = styled.div`
  background-color: #f6f9fc;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative;
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 250px;
    width: 150px;
  }
`;

const UploadButton = styled.label`
  background-color: #334e68;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 15px;

  &:hover {
    background-color: #102a43;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
    margin-top: 15px;
    height: 30px;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const CameraIcon = styled.img`
  width: 50px;
  height: 50px;
  opacity: 0.5;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const AnalyzeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px auto;
  display: block;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
    margin: 10px auto;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Analyze = () => {
  const [previews, setPreviews] = useState(Array(7).fill(null));
  const [modalImage, setModalImage] = useState(null);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Container>
      <Title>촬영하기</Title>
      <Card>
        {[...Array(7)].map((_, index) => (
          <Section key={index}>
            <LeftSection>
              <ExampleContainer>
                <ExampleImage src={`/imgs/picture/right-heel.png`} alt={`예시 사진 ${index + 1}`} />
              </ExampleContainer>
              <ExampleLabel>예시</ExampleLabel>
            </LeftSection>
            <RightSection>
              <UploadArea hasImage={!!previews[index]}>
                <PreviewContainer>
                  {previews[index] ? (
                    <PreviewImage
                      src={previews[index]}
                      alt={`미리보기 ${index + 1}`}
                      onClick={() => openModal(previews[index])}
                    />
                  ) : (
                    <CameraIcon src='/imgs/icon-photo.png' alt='카메라 아이콘' />
                  )}
                </PreviewContainer>
              </UploadArea>
              <UploadButton htmlFor={`file-upload-${index}`}>사진 업로드</UploadButton>
              <UploadInput
                type='file'
                id={`file-upload-${index}`}
                accept='image/*'
                onChange={(event) => handleFileChange(event, index)}
              />
            </RightSection>
          </Section>
        ))}
        <AnalyzeButton onClick={() => alert('분석을 시작합니다!')}>분석하기</AnalyzeButton>
      </Card>
      {modalImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImage src={modalImage} alt='확대된 이미지' />
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Analyze;
