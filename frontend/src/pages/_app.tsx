import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import store from '../../store/index';
import { Provider } from 'react-redux';
import Head from 'next/head'; // Head 컴포넌트 추가

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Pretendard', sans-serif;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ol {
    list-style: none;
  }
  html {
    font-size: 62.5%;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'
        />
      </Head>
      <Provider store={store}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
