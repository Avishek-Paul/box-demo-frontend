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
    'blue': '#0065b3',
    'red': '#e61030',
    'red_hover': '#dd1030'
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
