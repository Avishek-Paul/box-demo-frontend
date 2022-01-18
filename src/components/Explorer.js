import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListIcon,
    Stack,
    Skeleton,
    Link,
    Text,
    Icon
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { AiFillFolderOpen, AiFillFile } from 'react-icons/ai'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const Explorer = ({ initialFolderID }) => {

    // folder id and folder name
    const [folder, setFolder] = useState(initialFolderID)
    const [folderName, setFolderName] = useState("")
    // parent folder id and folder name
    const [parentFolder, setparentFolder] = useState(null)
    const [parentFolderName, setparentFolderName] = useState("")
    // current files
    const [files, setFiles] = useState([])

    const { promiseInProgress } = usePromiseTracker();

    function getFiles(folderID) {
        return fetch(`http://172.20.124.68:5000/folder?id=${folderID}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if ("error" in response) {
                    // Handle Error
                } else {
                    // update current folder states
                    setFolder(response.folder.id)
                    setFolderName(response.folder.name)
                    // update current files
                    setFiles(response.files)
                    // update parent states
                    if (response.folder.id !== 0) {
                        setparentFolder(response.folder.parent.id)
                        setparentFolderName(response.folder.parent.name)
                    }
                }
            })
    }

    useEffect(() => {
        trackPromise(getFiles(folder))
    }, [folder])

    const handleClick = (e, itemType, item) => {
        if (itemType === "folder") {
            setFolder(item.id)
        }
    }

    const backButton = <Link onClick={() => { setFolder(parentFolder) }}>
        <Icon as={RiArrowGoBackFill} /> Return to {parentFolderName}
    </Link>

    const displayItems = <Stack>
        <Text>Current Folder: {folderName}</Text>
        {folder !== 0 && backButton}
        <List spacing={0}>
            {
                files.map(item => {
                    const isFolder = item.type === "folder"
                    return <ListItem key={item.id} onClick={((e) => handleClick(e, item.type, item))}>
                        <Link href={!isFolder && item.shared_link} isExternal={!isFolder}>
                            <ListIcon as={isFolder ? AiFillFolderOpen : AiFillFile} />
                            {item.name} {isFolder && `(${item.num_items} items)`}
                            {!isFolder && <ExternalLinkIcon />}
                        </Link>
                    </ListItem>
                })
            }
        </List>
    </Stack>

    const loadingIndicator = <Stack>
        {[...Array(5)].map((e, i) => <Skeleton height={'20px'} key={i} />)}
    </Stack>

    return promiseInProgress ? loadingIndicator : displayItems
}

export default Explorer