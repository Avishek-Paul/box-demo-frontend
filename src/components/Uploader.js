import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Center, useColorModeValue, Icon, Stack } from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa'
import UploadStatus from '../components/UploadStatus'

const acceptedFileExtensions = ['.pdf', '.txt', '.jpg', '.jpeg', '.png']

export default function Dropzone() {

    const [docs, setDocs] = useState({})

    function processFile(file) {
        const data = new FormData()
        data.append('file', file)
        fetch(`${"http://172.20.120.71:4000"}/upload`, {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if ("error" in response) {
                    setDocs(
                        { ...docs, [response.name]: { success: false, error: response.error } }
                    )
                } else {
                    setDocs(
                        { ...docs, [response.name]: { success: true } }
                    )
                }
            })
    }

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            processFile(file);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: acceptedFileExtensions, multiple: true,
    });

    const dropText = isDragActive ? 'Drop the file here!' : 'Drag and drop file here, or click to select files';

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
                <Icon as={FaFileUpload} mr={2} />
                <p>{dropText}</p>
            </Center>
            {Object.keys(docs).length > 0 ? <UploadStatus statusList={docs} /> : null}
        </Stack>
    );
}

