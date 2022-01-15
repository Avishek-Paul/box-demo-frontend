import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Uploader from './components/Uploader'

const colors = {
  brand: {
    900: '#0065b3',
    800: '#e61030',
    700: '#FFFFFF',
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Uploader />
    </ChakraProvider>
  );
}

export default App;
