import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa'

const acceptedFileExtensions = ['.pdf', '.txt', '.jpg', '.jpeg', '.png']

export default function Dropzone({ onFileAccepted }) {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach(file => {
            onFileAccepted(file);
        });
    }, [onFileAccepted]);

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

    );
}

