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
import { ConversationId, Message } from '../../../../../types/types'
import { messageDelete } from '../../../../../utils/messageHandler'

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
    const handleDelete = async () => {
        await messageDelete({
            conversationId,
            message,
            userTo,
        }).then(() => {
            onClose()
        })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete message</ModalHeader>
                <ModalCloseButton />
                <ModalBody color="red.100">
                    *Are you sure you want to delete this message?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="solid"
                        color="black"
                        _hover={{
                            backgroundColor: 'red.300',
                        }}
                        backgroundColor="red.400"
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
