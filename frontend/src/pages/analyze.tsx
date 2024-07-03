import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 850px) {
    html {
      font-size: 50%;
    }
  }
  @media screen and (max-width: 500px) {
    html {
      font-size: 40%;
    }
  }
`;

const AnalyzeLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .logo_section {
    .logo_wrapper {
      width: 30%;
      padding: 1rem 2rem;
      img {
        position: relative !important;
        height: auto !important;
        width: 100% !important;
        max-width: 150px;
      }
    }
  }
  .title_wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: red;
    padding: 0.5rem;
    .title {
      font-weight: 600;
      font-size: 1.4rem;
      background-color: yellow;
      padding: 1rem;
      font-size: 2rem;
    }
  }
  .picture_section {
    display: flex;
    padding: 2rem 4rem;
    border: 3px solid red;
    margin-top: 1rem;
    flex: 1;
    .abcBtn {
      position: absolute;
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fffc00;
      font-size: 2.5rem;
      cursor: pointer;
    }
    .left_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      .picture_wrapper {
        position: relative;
        background-color: #eaeef0;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        font-weight: 600;
        color: white;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: contain; //이미지가 비율에 맞춰서 잘 보임 하지만 크기가 꽉차지 않음.
        }
      }
      .label {
        background-color: #fffc00;
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
      }
    }
    .right_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      padding: 0 4rem;
      .top_wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 5rem;
        height: 50%;
      }
      .bottom_wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        height: 50%;
      }
      .right_picture_section {
        width: 29%;
        display: flex;
        flex-direction: column;
        .right_picture_wrapper {
          background-color: #eaeef0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
          font-weight: 600;
          color: white;
          text-align: center;
          flex: 1;
          img {
            width: 100%;
            height: 100%;
            aspect-ratio: 16 / 9;
            object-fit: contain; //이미지가 비율에 맞춰서 잘 보임 하지만 크기가 꽉차지 않음.
          }
        }
        .label {
          background-color: #fffc00;
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .picture_section {
      padding: 1rem;
      .right_wrapper {
        padding: 0;
        padding-left: 1rem;
      }
    }
  }
`;

const Analyze = () => {
  const fileRef1 = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);
  const fileRef3 = useRef<HTMLInputElement>(null);
  const fileRef4 = useRef<HTMLInputElement>(null);
  const fileRef5 = useRef<HTMLInputElement>(null);
  const fileRef6 = useRef<HTMLInputElement>(null);
  const fileRef7 = useRef<HTMLInputElement>(null);

  const picWrapper1 = useRef<HTMLDivElement>(null);
  const picWrapper2 = useRef<HTMLDivElement>(null);
  const picWrapper3 = useRef<HTMLDivElement>(null);
  const picWrapper4 = useRef<HTMLDivElement>(null);
  const picWrapper5 = useRef<HTMLDivElement>(null);
  const picWrapper6 = useRef<HTMLDivElement>(null);
  const picWrapper7 = useRef<HTMLDivElement>(null);

  const onClick1 = useCallback(() => {
    fileRef1.current?.click();
  }, []);
  const onClick2 = useCallback(() => {
    fileRef2.current?.click();
  }, []);
  const onClick3 = useCallback(() => {
    fileRef3.current?.click();
  }, []);
  const onClick4 = useCallback(() => {
    fileRef4.current?.click();
  }, []);
  const onClick5 = useCallback(() => {
    fileRef5.current?.click();
  }, []);
  const onClick6 = useCallback(() => {
    fileRef6.current?.click();
  }, []);
  const onClick7 = useCallback(() => {
    fileRef7.current?.click();
  }, []);

  const onchange1 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper1.current) {
          picWrapper1.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange2 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper2.current) {
          picWrapper2.current.innerHTML = `
            <Image src=${event.target?.result} alt="img"  />
          `;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange3 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper3.current) {
          picWrapper3.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange4 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper4.current) {
          picWrapper4.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange5 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper5.current) {
          picWrapper5.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange6 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper6.current) {
          picWrapper6.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const onchange7 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (picWrapper7.current) {
          picWrapper7.current.innerHTML = `<Image src=${event.target?.result} alt="img"  />`;
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <AnalyzeLayout>
        <div className='logo_section'>
          <div className='logo_wrapper'>
            <Image src='/imgs/abcLogo.png' fill alt='abcLogo' />
          </div>
        </div>
        <div className='title_wrapper'>
          <div className='title'>Feet & legs analyzer by WALK101</div>
        </div>
        <div className='picture_section'>
          <div className='left_wrapper'>
            <div className='picture_wrapper' ref={picWrapper1}>
              <div className='title'>
                Both leg
                <br /> anterior
              </div>
              <div className='abcBtn' onClick={onClick1}>
                ABC
              </div>
              <input type='file' accept='image/*' ref={fileRef1} onChange={onchange1} style={{ display: 'none' }} />
            </div>
            <div className='label'>
              Both leg
              <br />
              anterior
            </div>
          </div>
          <div className='right_wrapper'>
            <div className='top_wrapper'>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper2}>
                  <div>
                    Rt foot
                    <br />
                    superior
                  </div>
                  <div className='abcBtn' onClick={onClick2}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef2} onChange={onchange2} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Rt foot
                  <br />
                  superior
                </div>
              </div>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper3}>
                  <div>
                    Lt foot
                    <br />
                    superior
                  </div>
                  <div className='abcBtn' onClick={onClick3}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef3} onChange={onchange3} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Lt foot
                  <br />
                  superior
                </div>
              </div>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper4}>
                  <div>
                    Lt ankle
                    <br />
                    posterior
                  </div>
                  <div className='abcBtn' onClick={onClick4}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef4} onChange={onchange4} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Lt ankle
                  <br />
                  posterior
                </div>
              </div>
            </div>
            <div className='bottom_wrapper'>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper5}>
                  <div>
                    Rt foot
                    <br />
                    medial
                  </div>
                  <div className='abcBtn' onClick={onClick5}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef5} onChange={onchange5} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Rt foot
                  <br />
                  medial
                </div>
              </div>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper6}>
                  <div>
                    Lt foot
                    <br />
                    medial
                  </div>
                  <div className='abcBtn' onClick={onClick6}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef6} onChange={onchange6} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Lt foot
                  <br />
                  medial
                </div>
              </div>
              <div className='right_picture_section'>
                <div className='right_picture_wrapper' ref={picWrapper7}>
                  <div>
                    Rt ankle
                    <br />
                    posterior
                  </div>
                  <div className='abcBtn' onClick={onClick7}>
                    ABC
                  </div>
                  <input type='file' accept='image/*' ref={fileRef7} onChange={onchange7} style={{ display: 'none' }} />
                </div>
                <div className='label'>
                  Rt ankle
                  <br />
                  posterior
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnalyzeLayout>
    </>
  );
};

export default Analyze;
