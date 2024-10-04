import React, { useState, ChangeEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import loadingAnimation from '../../running.json'; // JSON 파일 경로
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { analysis } from '../../reducers/post/postSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1f3d3f, #255597);
  padding: 40px 20px;
  transition: background-color 0.5s ease;

  @media (max-width: 768px) {
    padding: 20px 10px;
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
  font-size: 3em;
  color: #ffffff;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 2.2em;
    margin-bottom: 20px;
  }
`;

const IconBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FootIconWrapper = styled.div<{ selected: boolean }>`
  width: 75px;
  height: 75px;
  margin: 5px;
  /* background-color: gray; */
  /* border: 1px solid black; */
  //border-radius: 50%;
  overflow: hidden; /* 이미지가 부모를 벗어나지 않도록 설정 */
  cursor: pointer;
  transition: border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 380px) {
    width: 30px;
    height: 30px;
  }
`;

const FootIcon = styled.img<{ selected: boolean }>`
  width: 75%;
  margin: 5px;
  // border: ${({ selected }) => (selected ? '3px solid #007bff' : '2px solid transparent')};
  cursor: pointer;
  transition: border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  object-fit: cover; /* 추가된 속성 */

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 380px) {
    width: 30px;
    height: 30px;
    &:hover {
      transform: scale(1.1);
    }
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
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 10px;
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
  //height: 400px;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
    justify-content: flex-start;
    align-items: center;
  }
`;

const ExampleContainer = styled.div`
  box-sizing: border-box;
  background-color: #f6f9fc;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  //aspect-ratio: 10/12;
  height: 430px;
  width: 300px;

  @media (max-width: 768px) {
    width: 200px;
    height: 280px;
    aspect-ratio: 1/1.4;
    //height: auto;
  }
  @media (max-width: 500px) {
    width: 140px;
    height: 200px;
  }
  @media (max-width: 380px) {
    width: 100px;
    height: 140px;
  }
`;

const ExampleImage = styled.img`
  //height: 430px;
  //width: 300px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ExampleLabel = styled.div`
  font-size: 16px;
  margin-top: 15px;
  font-weight: 600;
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
    align-items: center;
  }
`;

interface UploadAreaProps {
  hasImage: boolean;
}

const UploadArea = styled.div<UploadAreaProps>`
  background-color: #f6f9fc;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative;
  height: auto;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  //aspect-ratio: 10/12;
  //height: 430px;
  //width: 300px;
  @media (max-width: 768px) {
    width: 200px;
    height: 280px;
    aspect-ratio: 1 / 1.4;
  }
  @media (max-width: 500px) {
    width: 140px;
    height: 200px;
  }
  @media (max-width: 380px) {
    width: 100px;
    height: 140px;
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
    margin-top: 10px;
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
  //height: 100%;
  //width: 100%;
  height: 430px;
  width: 300px;
  overflow: hidden;
  //aspect-ratio: 10/12;
  @media (max-width: 768px) {
    width: 200px;
    height: 280px;
  }
  @media (max-width: 500px) {
    width: 140px;
    height: 200px;
  }
  @media (max-width: 380px) {
    width: 100px;
    height: 140px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
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
  padding: 15px 50px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin: 30px auto;
  display: block;
  font-size: 1.4em;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 30px;
    font-size: 1em;
    margin: 15px auto;
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
  border-radius: 10px;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

const LottieContainer = styled.div`
  width: 300px;
  height: 300px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 380px) {
    width: 150px;
    height: 150px;
  }
`;

const LoadingText = styled.div`
  font-size: 1.2em;
  color: #334e68;
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  span {
    font-size: 25px;
    font-weight: 600;
  }
`;

const Analyze: React.FC = () => {
  const [selectedFoot, setSelectedFoot] = useState<number>(0); // 0 ~ 6
  const [previews, setPreviews] = useState<(string | null)[]>(Array(7).fill(null));
  const [files, setFiles] = useState<(File | null)[]>(Array(7).fill(null));
  const [modalImage, setModalImage] = useState<string | null>(null);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { analysisLoading } = useSelector((state: RootState) => state.post);

  const handleFootSelect = (index: number) => {
    setSelectedFoot(index);
  };

  const footIcons = [
    '/imgs/icons/foot1.png',
    '/imgs/icons/foot2.png',
    '/imgs/icons/foot3.png',
    '/imgs/icons/foot4.png',
    '/imgs/icons/foot5.png',
    '/imgs/icons/foot6.png',
    '/imgs/icons/foot7.png',
  ];

  const exampleImages = [
    '/imgs/picture/left-foot.png',
    '/imgs/picture/right-foot.png',
    '/imgs/picture/left-heel.png',
    '/imgs/picture/right-heel.png',
    '/imgs/examples/foot5_example.png',
    '/imgs/examples/foot6_example.png',
    '/imgs/examples/foot7_example.png',
  ];

  console.log('files', files);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const newPreviews = [...previews];
      const newFiles = [...files];
      newPreviews[index] = URL.createObjectURL(file);
      newFiles[index] = file;
      setPreviews(newPreviews);
      setFiles(newFiles);
    }
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleAnalyzeClick = async () => {
    if (analysisLoading) return;

    const formData = new FormData();

    // 파일들을 formData에 추가 (비어있지 않은 파일만)
    files.forEach((file, index) => {
      if (file) {
        formData.append('images', file); // 파일이 있으면 파일을 추가
      } else {
        // 빈파일 생성
        const emptyBlob = new Blob([], { type: 'application/x-empty' });
        formData.append('images', emptyBlob, `empty_file_${index}.txt`);
      }
    });
    console.log('formData', formData);
    try {
      console.log('files', files);
      //백엔드로 요청 보내기 (예: POST 요청)
      // const response = await axios.post('http://localhost:8000/user/analyze', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     //'Content-Type': 'application/json',
      //   },
      // });
      // analysis Thunk 호출
      const resultAction = await dispatch(analysis({ formData }));

      if (analysis.fulfilled.match(resultAction)) {
        console.log('response', resultAction.payload);
        // 결과 페이지로 이동 (백엔드에서 받은 데이터를 결과 페이지로 전달 가능)
        router.push('/result');
      } else {
        //alert('분석에 실패했습니다.');
        console.error('Error:', resultAction.payload);
        // 에러 처리 (사용자에게 알림 등을 제공)
      }
      // 결과 페이지로 이동 (백엔드에서 받은 데이터를 결과 페이지로 전달 가능)
      router.push('/result');
    } catch (error) {
      console.error('Error uploading images:', error);
      // 에러 처리 (사용자에게 알림 등을 제공)
      alert('분석에 실패했습니다.');
    }
  };

  if (analysisLoading) {
    return (
      <LoadingContainer>
        <LottieContainer>
          <Lottie animationData={loadingAnimation} loop />
        </LottieContainer>
        <LoadingText>
          <span>분석 중입니다</span>
        </LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Title>촬영하기</Title>
      <IconBar>
        {footIcons.map((icon, index) => (
          <FootIconWrapper
            key={index}
            selected={selectedFoot === index}
            onClick={() => handleFootSelect(index)}
            role='button'
            tabIndex={0}
            aria-pressed={selectedFoot === index}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleFootSelect(index);
            }}
          >
            <FootIcon src={icon} alt={`발 모양 ${index + 1}`} selected={selectedFoot === index} />
          </FootIconWrapper>
        ))}
      </IconBar>
      <Card>
        <Section>
          <LeftSection>
            <ExampleContainer>
              <ExampleImage src={exampleImages[selectedFoot]} alt={`예시 사진 ${selectedFoot + 1}`} />
            </ExampleContainer>
            <ExampleLabel>예시</ExampleLabel>
          </LeftSection>
          <RightSection>
            <UploadArea hasImage={!!previews[selectedFoot]}>
              <PreviewContainer>
                {previews[selectedFoot] ? (
                  <PreviewImage
                    src={previews[selectedFoot]!}
                    alt={`미리보기 ${selectedFoot + 1}`}
                    onClick={() => openModal(previews[selectedFoot]!)}
                  />
                ) : (
                  <CameraIcon src='/imgs/icon-photo.png' alt='카메라 아이콘' />
                )}
              </PreviewContainer>
            </UploadArea>
            <UploadButton htmlFor={`file-upload-${selectedFoot}`}>사진 업로드</UploadButton>
            <UploadInput
              type='file'
              id={`file-upload-${selectedFoot}`}
              accept='image/*'
              onChange={(event) => handleFileChange(event, selectedFoot)}
            />
          </RightSection>
        </Section>
        <AnalyzeButton onClick={handleAnalyzeClick}>분석하기</AnalyzeButton>
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
