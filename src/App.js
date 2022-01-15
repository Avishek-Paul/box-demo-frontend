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
import Navbar from './components/Navbar'

const colors = {
  brand: {
    900: '#0065b3',
    800: '#e61030',
    700: '#FFFFFF',
  },
}

const theme = extendTheme({ colors })

function processFile(file) {

  const data = new FormData()
  data.append('file', file)

  fetch("http://172.20.123.180:4000/upload", {
    method: 'POST',
    body: data
  }).then(response => response.json())
    .then(result => console.log(result))

}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Uploader onFileAccepted={processFile} />
    </ChakraProvider>
  );
}

export default App;
