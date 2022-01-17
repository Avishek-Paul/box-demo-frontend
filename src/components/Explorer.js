import useState from 'react'
import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const Explorer = ({ initialFolderID }) => {

    const [folder, setFolder] = useState(initialFolderID)
    const [files, setFiles] = useState([])
    const { promiseInProgress } = usePromiseTracker();

    function getFiles(folder) {
        return fetch(`${"http://172.20.125.101:4000/"}/folder?id=${154202022019}`)
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

    return <List spacing={0}>
        {
            files.map(item => {
                return <ListItem key={item}>
                    <ListIcon as={item.type === "folder" ? MdCheckCircle : MdCancel} />
                    {item.name}
                </ListItem>
            })
        }
    </List>

}

export default Explorer