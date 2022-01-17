import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'


const UploadStatus = ({ statusList }) => {
    return <List spacing={0}>
        {
            Object.keys(statusList).map(item => {
                return <ListItem key={item}>
                    <ListIcon as={statusList[item].success ? MdCheckCircle : MdCancel} color={statusList[item].success ? 'green.500' : 'red.500'} />
                    {item} {"error" in statusList[item] ? `- ${statusList[item].error}` : null}
                </ListItem>
            })
        }
    </List>
}

export default UploadStatus