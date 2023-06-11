import {
    Text,
    Flex,
    Image,
    ButtonGroup,
    IconButton,
    Input,
    useDisclosure,
} from '@chakra-ui/react'
import timeago from 'epoch-timeago'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import getUserImage from '../../../../../utils/getUserImg'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import { ConversationId, Message } from '../../../../../types/types'
import useOnHoverOutside from '../../../../../hooks/useOnHover'
import DeleteMsgModal from './DeleteMsgModal'
import { messageEdit } from '../../../../../utils/messageHandler'

export default function ChatMessage({ message }: { message: Message }) {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const dispatch = useAppDispatch()
    const isCurrentUser = currentUser.userId === message.userId
    const [isOpen, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editMessage, setEditMessage] = useState('')
    const messageRef = useRef(null)
    const { isOpen: modalIsOpen, onOpen, onClose } = useDisclosure()

    const conversationId = useAppSelector(
        (state) => state.convoSlice.activeConvo?.conversationId
    ) as ConversationId
    const userTo = useAppSelector(
        (state) => state.convoSlice.activeConvo?.userId
    )

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

    useEffect(() => {
        console.log(message.content)
    }, [])

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (userTo && isEditing) {
            messageEdit({
                conversationId,
                message,
                updatedContent: editMessage,
                userTo,
            })
        }
        return setIsEditing(false)
    }

    useOnHoverOutside(messageRef, closeHoverMenu)
    if (isCurrentUser) {
        chatMessage = (
            <Flex
                maxW={['90%', '100%']}
                ml={isCurrentUser ? 'auto' : ''}
                mr={isCurrentUser ? '' : 'auto'}
                mb="0.1rem"
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
                            backgroundColor="gray.700"
                            _hover={{
                                backgroundColor: 'gray.600',
                            }}
                        />
                        <IconButton
                            backgroundColor="gray.700"
                            aria-label="delete-icon"
                            onClick={onOpen}
                            _hover={{
                                backgroundColor: 'gray.600',
                            }}
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
                        <Text maxW={['150px', '175px', '350px']}>
                            {message.content}
                        </Text>
                    )}
                </Flex>
                <Image
                    mt="auto"
                    boxSize="40px"
                    borderRadius="full"
                    src={userImg}
                    ml="0.5rem"
                />
                <DeleteMsgModal
                    isOpen={modalIsOpen}
                    onClose={onClose}
                    message={message}
                    conversationId={conversationId}
                    userTo={userTo as string}
                />
            </Flex>
        )
    } else {
        chatMessage = (
            <Flex
                maxW={['90%']}
                ml={isCurrentUser ? 'auto' : ''}
                mr={isCurrentUser ? '' : 'auto'}
                mb="0.1rem"
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
                    <Text maxW={['150px', '175px', '350px']}>
                        {message.content}
                    </Text>
                </Flex>
            </Flex>
        )
    }
    return chatMessage
}
