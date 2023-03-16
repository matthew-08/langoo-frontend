import React, { useState } from 'react'
import {
    HStack,
    IconButton,
    Input,
    Flex,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react'
import { AttachmentIcon, ChatIcon } from '@chakra-ui/icons'
import { Conversation } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import messageHandler from '../../../../../utils/messageHandler'

function MessageInput({ convo }: { convo: Conversation | undefined }) {
    const currentUser = useAppSelector((state) => state.authReducer.user.userId)
    const [input, setInput] = useState<string>('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (convo && currentUser) {
            await messageHandler(convo, currentUser, input).then((res) => {
                console.log(res)
                setInput('')
            })
        }
    }
    return (
        <HStack width="100%" pl="1rem" pr="1rem" mt="auto" pb="1rem">
            <Flex
                as="form"
                width="100%"
                gap="1rem"
                onSubmit={(e) => handleSubmit(e)}
            >
                <InputGroup
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="10px"
                    colorScheme="teal"
                >
                    <InputLeftAddon
                        // eslint-disable-next-line react/no-children-prop
                        children={<AttachmentIcon />}
                        cursor="pointer"
                    />
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        colorScheme="teal"
                        border="none"
                        disabled={!convo && true}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </InputGroup>
                <IconButton
                    aria-label="submit-button"
                    border="2px"
                    borderColor="blue.200"
                    borderRadius="50%"
                    backgroundColor="blue.400"
                    type="submit"
                    icon={<ChatIcon color="white" />}
                />
            </Flex>
        </HStack>
    )
}

export default MessageInput
