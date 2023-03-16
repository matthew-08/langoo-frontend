import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Action } from '@remix-run/router'
import { SetActiveView, User } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import { addConvo } from '../../../../../features/convoSlice'
import messageHandler from '../../../../../utils/messageHandler'

interface Props {
    onOpen: () => void
    onClose: () => void
    isOpen: boolean
    userClicked: User
    setActiveView: SetActiveView
}

function NewChatModal({
    onClose,
    onOpen,
    isOpen,
    userClicked,
    setActiveView,
}: Props) {
    const [input, setInput] = useState('')
    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(
        (state) => state.authReducer.user.userId
    )

    const submitConvo = () => {
        dispatch(addConvo(userClicked.userId))
            .then((res) => {
                if (addConvo.fulfilled.match(res)) {
                    const newConvo = res.payload
                    messageHandler(newConvo, currentUserId!, input)
                }
            })
            .then(() => {
                onClose()
                setActiveView('chat')
            })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Chat</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Introduce yourself to {userClicked.username}</Text>
                    <Input
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="ghost" onSubmit={submitConvo}>
                        Message
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewChatModal
