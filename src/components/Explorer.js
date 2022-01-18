import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListIcon,
    Stack,
    Skeleton,
    Text
} from '@chakra-ui/react'
import { AiFillFolderOpen, AiFillFile } from 'react-icons/ai'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const Explorer = ({ initialFolderID }) => {

    const [folder, setFolder] = useState(initialFolderID)
    const [folderName, setFolderName] = useState("")
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
                    // update current folder state
                    setFolder(response.folder.id)
                    setFolderName(response.folder.name)
                    // update current files
                    setFiles(response.files)
                }
            })
    }

    useEffect(() => {
        trackPromise(getFiles(folder))
    }, [folder])

    const handleClick = (e, folderID, itemType) => {
        if (itemType === "folder") {
            setFolder(folderID)
        }
    }

    const displayItems = <Stack>
        <Text>Current Folder: {folderName}</Text>
        <List spacing={0}>
            {
                files.map(item => {
                    return <ListItem key={item.id} onClick={((e) => handleClick(e, item.id, item.type))}>
                        <ListIcon as={item.type === "folder" ? AiFillFolderOpen : AiFillFile} />
                        {item.name} {item.type === "folder" ? `(${item.num_items} items)` : null}
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