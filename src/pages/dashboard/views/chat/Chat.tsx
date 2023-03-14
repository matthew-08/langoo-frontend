import React, { useEffect } from 'react'
import {
    VStack,
    Flex,
    Text,
    HStack,
    Circle,
    useMediaQuery,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { fetchConversations } from '../../../../features/convoSlice'
import UserConversation from './components/UserConversation'
import { isSmallerThan700 } from '../../../../features/viewSlice'
import CurrentConversation from './components/CurrentConversation'

export default function Chat() {
    const conversationList = useAppSelector(
        (state) => state.convoSlice.conversations
    )
    const convoListLoading = useAppSelector((state) => state.convoSlice.loading)
    const haveFetchedConvos = useAppSelector(
        (state) => state.convoSlice.fetched
    )
    const currentConversation = useAppSelector(
        (state) => state.convoSlice.activeConvo
    )
    const dispatch = useAppDispatch()

    const [checkIsSmallerThan700] = useMediaQuery('(max-width: 700px)')

    const convoView = useAppSelector(
        (state) => state.viewSlice.componentViews.allConversations
    )
    useEffect(() => {
        console.log(checkIsSmallerThan700)
        dispatch(isSmallerThan700(checkIsSmallerThan700))
    }, [checkIsSmallerThan700])

    useEffect(() => {
        if (!haveFetchedConvos) {
            dispatch(fetchConversations())
        }
    }, [])

    let conversations

    if (convoListLoading) {
        conversations = <div>Loading</div>
    } else if (conversationList.length === 0) {
        conversations = <div>You dont have any conversations yet.</div>
    } else {
        conversations = conversationList.map((convo) => (
            <UserConversation convo={convo} />
        ))
    }

    return (
        <Flex as="section" flex="1" maxH="100%">
            <VStack
                // Conversations side-panel
                width={checkIsSmallerThan700 ? '100%' : '30%'}
                height="100%"
                as="aside"
                borderRight="3px solid"
                borderRightColor="#2d3055"
                padding="1rem"
                display={checkIsSmallerThan700 ? convoView : 'flex'}
            >
                <HStack mr="auto">
                    <Heading fontSize="2xl">Messages</Heading>
                    <Circle background="red.400" size="30px" fontWeight="bold">
                        <Text>12</Text>
                    </Circle>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        // eslint-disable-next-line react/no-children-prop
                        children={<Search2Icon />}
                    />
                    <Input type="text" placeholder="Search conversations..." />
                </InputGroup>
                {conversations}
            </VStack>
            {currentConversation ? (
                <CurrentConversation />
            ) : (
                <Flex
                    w="70%"
                    maxW="70%"
                    justify="center"
                    display={checkIsSmallerThan700 ? 'none' : 'flex'}
                    flexDir="column"
                >
                    <Heading mx="auto" textAlign="center">
                        Welcome to Langoop!
                    </Heading>
                    <Text>
                        Click an existing conversation or the discover section
                        to start chatting now!
                    </Text>
                </Flex>
            )}
        </Flex>
    )
}
