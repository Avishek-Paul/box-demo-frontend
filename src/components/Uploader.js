import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Center, useColorModeValue, Icon, Stack, Text, Spinner } from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa'
import UploadStatus from '../components/UploadStatus'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const acceptedFileExtensions = ['.pdf', '.txt', '.jpg', '.jpeg', '.png']

export default function Dropzone() {

    const [docs, setDocs] = useState({})
    const { promiseInProgress } = usePromiseTracker();

    function processFile(file) {
        const data = new FormData()
        data.append('file', file)
        return fetch(`${"http://172.20.120.71:4000"}/upload`, {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if ("error" in response) {
                    setDocs(
                        docs => { return { ...docs, [response.name]: { success: false, error: response.error } } }
                    )
                } else {
                    setDocs(
                        docs => { return { ...docs, [response.name]: { success: true } } }
                    )
                }
            })
    }

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            trackPromise(processFile(file));
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileExtensions,
        multiple: true,
        disabled: promiseInProgress
    });

    const dropText = isDragActive ? 'Drop the files here!' : 'Drag and drop files here, or click to select files';

    const activeBg = useColorModeValue('gray.100', 'gray.600');
    const borderColor = useColorModeValue(
        isDragActive ? 'teal.300' : 'gray.300',
        isDragActive ? 'teal.500' : 'gray.500',
    );

    return (
        <Stack>
            <Center
                p={10}
                cursor="pointer"
                bg={isDragActive ? activeBg : 'transparent'}
                _hover={{ bg: activeBg }}
                transition="background-color 0.2s ease"
                borderRadius={4}
                border="3px dashed"
                borderColor={borderColor}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {promiseInProgress ? <Spinner size='md' color='brand.red' /> : <Icon as={FaFileUpload} mr={2} />}
                <Text ml={promiseInProgress ? 2 : 0}>{dropText}</Text>
            </Center>
            {Object.keys(docs).length > 0 ? <UploadStatus statusList={docs} /> : null}
        </Stack>
    );
}

