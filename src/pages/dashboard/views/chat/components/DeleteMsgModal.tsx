import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
} from '@chakra-ui/react'
import { onMessageDelete } from '../../../../../features/messagesSlice'
import { ConversationId, Message } from '../../../../../types/types'
import { useAppDispatch } from '../../../../../utils/hooks'
import socket from '../../../../../socket'
import { apiURL } from '../../../../../utils/apiUrl'

interface Props {
    isOpen: boolean
    onClose: () => void
    message: Message
    conversationId: ConversationId
    userTo: string
}

function DeleteMsgModal({
    isOpen,
    onClose,
    message,
    conversationId,
    userTo,
}: Props) {
    const dispatch = useAppDispatch()
    console.log(userTo)
    const handleDelete = async () => {
        console.log(userTo)
        dispatch(
            onMessageDelete({
                message: message,
                conversationId: conversationId,
            })
        )
        socket.emit('msg_delete', {
            message: message,
            conversationId: conversationId,
            to: userTo,
        })
        await fetch(
            `${apiURL}/convo/deleteMessage/${conversationId}/${message.timestamp}`,
            {
                method: 'DELETE',
                credentials: 'include',
            }
        )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete message</ModalHeader>
                <ModalCloseButton />
                <ModalBody color={'red.100'}>
                    *Are you sure you want to delete this message?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="solid"
                        color={'black'}
                        _hover={{
                            backgroundColor: 'red.300',
                        }}
                        backgroundColor={'red.400'}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteMsgModal
