import {
    Text,
    Flex,
    Image,
    Box,
    Container,
    useDisclosure,
    ButtonGroup,
    IconButton,
    Input,
} from '@chakra-ui/react'
import timeago from 'epoch-timeago'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import React, { useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { ConversationId, Message } from '../../../types/types'
import IMAGES from '../../../utils/images'
import getUserImage from '../../../utils/getUserImg'
import useOnHoverOutside from '../../../hooks/useOnHover'
import { onMessageEdit } from '../../../features/messagesSlice'

export default function ChatMessage({ message }: { message: Message }) {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const dispatch = useAppDispatch()
    const isCurrentUser = currentUser.userId === message.userId
    const [isOpen, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editMessage, setEditMessage] = useState('')
    const messageRef = useRef(null)
    const conversationId = useAppSelector(
        (state) => state.convoSlice.activeConvo?.conversationId
    ) as ConversationId

    let userImg
    if (isCurrentUser) {
        userImg = getUserImage(currentUser.userImg)
    } else {
        const fetchOtherUser = useAppSelector((state) =>
            state.usersSlice.allUsers.find(
                (user) => user.userId === message.userId
            )
        )
        userImg = getUserImage(fetchOtherUser?.userImg)
    }
    let chatMessage

    let timestamp
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime - Number(message.timestamp) > 1800) {
        timestamp = timeago(message.timestamp)
    } else {
        timestamp = false
    }

    const closeHoverMenu = () => {
        setOpen(false)
    }

    const handleSumbit = (e: React.MouseEvent) => {
        e.preventDefault()
        if (editMessage === '' || editMessage === message.content) {
            return setIsEditing(false)
        }
        const updatedMessage: Message = {
            timestamp: message.timestamp,
            userId: message.userId,
            content: editMessage,
        }
        dispatch(
            onMessageEdit({
                conversationId,
                message: updatedMessage,
            })
        )
        return setIsEditing(false)
    }

    useOnHoverOutside(messageRef, closeHoverMenu)
    if (isCurrentUser) {
        chatMessage = (
            <Flex
                maxW="40%"
                ml={isCurrentUser ? 'auto' : ''}
                mr={isCurrentUser ? '' : 'auto'}
                mb="1.2rem"
                position="relative"
                onMouseEnter={() => setOpen(true)}
                ref={messageRef}
            >
                <Flex
                    display={isOpen ? 'flex' : 'none'}
                    position="absolute"
                    top="-80px"
                    right="23px"
                    padding="2rem"
                >
                    <ButtonGroup>
                        <IconButton
                            aria-label="edit-button"
                            onClick={() => setIsEditing(true)}
                            icon={<EditIcon />}
                        />
                        <IconButton
                            aria-label="delete-cion"
                            icon={<DeleteIcon color="red.200" />}
                        />
                    </ButtonGroup>
                </Flex>
                <Flex
                    width="100%"
                    backgroundColor={isCurrentUser ? 'blue.400' : '#405375'}
                    padding="1rem"
                    borderRadius="10px"
                >
                    {isEditing ? (
                        <Flex as="form" onSubmit={handleSumbit}>
                            <Input
                                defaultValue={message.content}
                                onChange={(e) => setEditMessage(e.target.value)}
                            />
                        </Flex>
                    ) : (
                        <Text>{message.content}</Text>
                    )}
                </Flex>
                <Image
                    mt="auto"
                    boxSize="40px"
                    borderRadius="full"
                    src={userImg}
                    ml="0.5rem"
                />
            </Flex>
        )
    } else {
        chatMessage = (
            <Flex
                maxW="40%"
                ml={isCurrentUser ? 'auto' : ''}
                mr={isCurrentUser ? '' : 'auto'}
                mb="1.2rem"
            >
                <Image
                    mt="auto"
                    boxSize="40px"
                    borderRadius="full"
                    mr="0.5rem"
                    src={userImg}
                />
                <Flex
                    width="100%"
                    backgroundColor={isCurrentUser ? 'blue.400' : '#405375'}
                    padding="1rem"
                    borderRadius="10px"
                >
                    <Text>{message.content}</Text>
                </Flex>
            </Flex>
        )
    }
    return chatMessage
}