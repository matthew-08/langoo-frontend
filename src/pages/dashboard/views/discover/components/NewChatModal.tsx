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
import React, { useState } from 'react'
import { SetActiveView, User } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import { addConvo } from '../../../../../features/convoSlice'
import messageHandler from '../../../../../utils/messageHandler'
import { viewStatusSet } from '../../../../../features/viewSlice'

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
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(
        (state) => state.authReducer.user.userId
    )
    const isSmallerThan700 = useAppSelector(
        (state) => state.viewSlice.smallerThan700
    )

    const submitConvo = (e: React.FormEvent) => {
        console.log('submit convo')
        e.preventDefault()
        setLoading(true)
        dispatch(addConvo(userClicked.userId))
            .then(async (res) => {
                console.log(res)
                if (addConvo.fulfilled.match(res)) {
                    console.log('going to messagehandler')
                    const newConvo = res.payload
                    await messageHandler(newConvo, currentUserId!, input)
                }
            })
            .then(() => {
                setLoading(false)
                if (isSmallerThan700) {
                    dispatch(viewStatusSet('userConversation'))
                }
                onClose()
                setActiveView('chat')
            })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={submitConvo}>
                <ModalHeader>New Chat</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Introduce yourself to {userClicked.username}</Text>
                    <Input
                        mt="1rem"
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="ghost" type="submit" isLoading={loading}>
                        Message
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewChatModal
