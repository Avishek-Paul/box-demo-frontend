import { Heading, Text, Stack, Link } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const DocumentCenter = () => {
    return <Stack ml={4}>
        <Heading mt={2} mb={2}>
            Document Center
        </Heading>
        <Text mb={2}>
            Hi [NAME], please upload any required documentation here.
        </Text>

        <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList>
                <Tab>Identification</Tab>
                <Tab>Tax Forms</Tab>
                <Tab>Bank Statements</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Text>
                        Please upload any identifying documents. Examples include Passports, Driver's Licenses or Permits, State Issued ID Cards.
                        Full list of qualified documents can be found <Link href="#" style={{ textDecoration: "underline" }}>here</Link>.
                    </Text>
                </TabPanel>
                <TabPanel>
                    <Text>
                        Please upload any relevant tax documents. Examples include W-2, 1095, 1098, and 1099 forms.
                        Full list of qualified documents can be found <Link href="#" style={{ textDecoration: "underline" }}>here</Link>.
                    </Text>
                </TabPanel>
                <TabPanel>
                    <Text>
                        Please upload any relevant bank statements.
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>

    </Stack >

}

export default DocumentCenter