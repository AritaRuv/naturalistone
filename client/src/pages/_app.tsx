// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import {store} from '../store/store';


// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })

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