import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar'
import DocumentCenter from './containers/DocumentCenter'

const colors = {
  brand: {
    'blue': '#0065b3',
    'red': '#e61030',
    'red_hover': '#dd1030'
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <DocumentCenter />
    </ChakraProvider>
  );
}

export default App;
