// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
// 1. Import the extendTheme function
import { Provider } from 'react-redux';
import {store} from '../store/store';
import theme from '@/theme';

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp