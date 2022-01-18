import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListIcon,
    Stack,
    Skeleton
} from '@chakra-ui/react'
import { AiFillFolderOpen, AiFillFile } from 'react-icons/ai'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const Explorer = ({ initialFolderID }) => {

    const [folder, setFolder] = useState(initialFolderID)
    const [files, setFiles] = useState([])
    const { promiseInProgress } = usePromiseTracker();

    function getFiles(folder) {
        return fetch(`http://172.20.124.68:5000/folder?id=${folder}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if ("error" in response) {
                    // Handle Error
                } else {
                    // update current folder state
                    const folderID = response.folder_id
                    setFolder(folderID)
                    // update current files
                    const files = response.files
                    setFiles(files)
                }
            })
    }

    useEffect(() => {
        trackPromise(getFiles(folder))
    }, [folder])

    const displayItems = <Stack>
        <List spacing={0}>
            {
                files.map(item => {
                    return <ListItem key={item}>
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