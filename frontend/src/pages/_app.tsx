import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import store from '../../store/index';
import { Provider } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
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
      <Provider store={store}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
