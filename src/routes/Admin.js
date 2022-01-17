import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Navbar from '../components/Navbar'

const colors = {
    brand: {
        'blue': '#0065b3',
        'red': '#e61030',
        'red_hover': '#dd1030'
    },
}

const theme = extendTheme({ colors })

const Admin = () => {
    return <ChakraProvider theme={theme}>
        <Navbar />
    </ChakraProvider>
}

export default Admin