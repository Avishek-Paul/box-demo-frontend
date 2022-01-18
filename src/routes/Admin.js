import { ChakraProvider, extendTheme, Heading, Stack } from '@chakra-ui/react';
import Navbar from '../components/Navbar'
import Explorer from '../components/Explorer'

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
        <Stack ml={4} mt={2}>
            <Heading>Uploaded Documents</Heading>
            <Explorer initialFolderID={0} />
        </Stack>
    </ChakraProvider>
}

export default Admin