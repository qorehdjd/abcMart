// import React, { useState, FormEvent, ChangeEvent } from 'react';
// import styled, { createGlobalStyle, keyframes } from 'styled-components';
// import supabase from '../utils/supabaseClient'; // Supabase 클라이언트를 가져오는 경로 확인

// const GlobalStyle = createGlobalStyle`
//   @media screen and (max-width: 600px) {
//     html {
//       font-size: 45%;
//     }
//   }
// `;

// const fadeUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const SignupContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;
//   padding: 2rem;
//   animation: ${fadeUp} 1s ease-out;

//   .title {
//     font-size: 2.4rem;
//     font-weight: 600;
//     margin-bottom: 2rem;
//     text-align: center;
//   }

//   form {
//     width: 100%;
//     max-width: 500px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     .input-wrapper {
//       width: 100%;
//       margin-bottom: 1.2rem;

//       input {
//         width: 100%;
//         padding: 1rem;
//         border: 2px solid #ccc;
//         border-radius: 4px;
//         outline: none;
//         font-size: 1.6rem;

//         &:focus {
//           border-color: #1a4a9d;
//         }
//       }
//     }

//     .verification-wrapper {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       width: 100%;

//       .verification-input {
//         flex: 1;
//       }

//       .verification-button {
//         padding: 1rem;
//         background-color: #1a4a9d;
//         color: #fff;
//         border: none;
//         border-radius: 4px;
//         font-size: 1.4rem;
//         cursor: pointer;
//       }
//     }

//     .submit-button {
//       width: 100%;
//       padding: 1.2rem;
//       background-color: #1a4a9d;
//       color: #fff;
//       border: none;
//       border-radius: 4px;
//       font-size: 1.8rem;
//       cursor: pointer;
//       margin-top: 2rem;
//     }
//   }
// `;

// const SignupPage: React.FC = () => {
//   const [id, setId] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [nickname, setNickname] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [phone, setPhone] = useState<string>('+82');
//   const [verificationCode, setVerificationCode] = useState<string>('');
//   const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
//   const [isVerified, setIsVerified] = useState<boolean>(false);
//   const [errors, setErrors] = useState<{ id?: string; nickname?: string; password?: string; confirmPassword?: string }>(
//     {},
//   );

//   const idRegex = /^[a-z0-9]{5,10}$/;
//   const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
//   const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

//   const validateId = (id: string) => idRegex.test(id);
//   const validateNickname = (nickname: string) => nicknameRegex.test(nickname);
//   const validatePassword = (password: string) => passwordRegex.test(password);

//   const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value;

//     // 전화번호 형식: +82 이후 첫 0을 제거하고 공백 없이 설정
//     if (value.startsWith('+82 0')) {
//       value = '+82' + value.slice(4); // "+82 " 이후의 "0"을 제거
//     }

//     setPhone(value.startsWith('+82') ? value : '+82 ');
//   };

//   console.log('phone', phone);

//   const handleRequestVerificationCode = async () => {
//     // 공백을 제거한 전화번호 형식으로 변환
//     const formattedPhone = phone.replace(/\s+/g, '');

//     if (formattedPhone.length < 6) return alert('전화번호를 올바르게 입력하세요.');

//     try {
//       console.log('formattedPhone', formattedPhone);
//       const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
//       if (error) throw error;
//       setIsCodeSent(true);
//       alert('인증번호가 발송되었습니다.');
//     } catch (error: any) {
//       console.error('인증번호 요청 실패:', error.message);
//     }
//   };

//   const handleVerifyCode = async () => {
//     if (!verificationCode) return alert('인증번호를 입력하세요.');
//     try {
//       const { error } = await supabase.auth.verifyOtp({
//         phone,
//         token: verificationCode,
//         type: 'sms',
//       });
//       if (error) throw error;
//       setIsVerified(true);
//       alert('전화번호 인증이 완료되었습니다.');
//     } catch (error: any) {
//       console.error('인증 실패:', error.message);
//       alert('인증번호가 일치하지 않습니다.');
//     }
//   };

//   const handleSignup = (e: FormEvent) => {
//     e.preventDefault();
//     const newErrors: { id?: string; nickname?: string; password?: string; confirmPassword?: string } = {};

//     if (!validateId(id)) {
//       newErrors.id = '아이디는 영어 소문자와 숫자로 이루어진 5~10자여야 합니다.';
//     }
//     if (!validateNickname(nickname)) {
//       newErrors.nickname = '닉네임은 한글, 영어, 숫자 조합으로 2~10자여야 합니다.';
//     }
//     if (!validatePassword(password)) {
//       newErrors.password = '비밀번호는 최소 8자 이상, 하나 이상의 특수문자를 포함해야 합니다.';
//     }
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
//     }

//     if (Object.keys(newErrors).length === 0) {
//       console.log('회원가입 요청 전송');
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <SignupContainer>
//         <h2 className='title'>회원가입</h2>
//         <form onSubmit={handleSignup}>
//           <div className='input-wrapper'>
//             <input type='text' placeholder='아이디' value={id} onChange={(e) => setId(e.target.value)} />
//             {errors.id && <span style={{ color: 'red', fontSize: '1.2rem' }}>{errors.id}</span>}
//           </div>
//           <div className='input-wrapper'>
//             <input
//               type='password'
//               placeholder='비밀번호'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && <span style={{ color: 'red', fontSize: '1.2rem' }}>{errors.password}</span>}
//           </div>
//           <div className='input-wrapper'>
//             <input
//               type='password'
//               placeholder='비밀번호 확인'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             {errors.confirmPassword && (
//               <span style={{ color: 'red', fontSize: '1.2rem' }}>{errors.confirmPassword}</span>
//             )}
//           </div>
//           <div className='input-wrapper'>
//             <input type='text' placeholder='닉네임' value={nickname} onChange={(e) => setNickname(e.target.value)} />
//             {errors.nickname && <span style={{ color: 'red', fontSize: '1.2rem' }}>{errors.nickname}</span>}
//           </div>
//           <div className='input-wrapper'>
//             <input type='email' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className='verification-wrapper'>
//             <input
//               className='verification-input'
//               type='tel'
//               placeholder='전화번호'
//               value={phone}
//               onChange={handlePhoneChange}
//             />
//             <button type='button' onClick={handleRequestVerificationCode} className='verification-button'>
//               인증받기
//             </button>
//           </div>
//           {isCodeSent && (
//             <div className='input-wrapper'>
//               <input
//                 type='text'
//                 placeholder='인증번호 입력'
//                 value={verificationCode}
//                 onChange={(e) => setVerificationCode(e.target.value)}
//               />
//               <button type='button' onClick={handleVerifyCode} className='verification-button'>
//                 확인
//               </button>
//             </div>
//           )}
//           {isVerified && <p>전화번호 인증이 완료되었습니다.</p>}
//           <button type='submit' className='submit-button'>
//             회원가입
//           </button>
//         </form>
//       </SignupContainer>
//     </>
//   );
// };

// export default SignupPage;
