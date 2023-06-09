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
    Image,
    Box,
    Divider,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { v4 as uuid } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { fetchConversations } from '../../../../features/convoSlice'
import UserConversation from './components/UserConversation'
import { isSmallerThan700 } from '../../../../features/viewSlice'
import CurrentConversation from './components/CurrentConversation'
import MainLogo from '../../../../global_components/MainLogo'
import IMAGES from '../../../../utils/images'
import whiteFilter from '../../../../utils/whiteFilter'
import Loading from '../../../../global_components/Loading'

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
        dispatch(isSmallerThan700(checkIsSmallerThan700))
    }, [checkIsSmallerThan700])

    useEffect(() => {
        if (!haveFetchedConvos) {
            dispatch(fetchConversations())
        }
    }, [])

    let conversations

    if (convoListLoading) {
        conversations = (
            <Flex mt="3rem" mx="auto">
                <Loading loadingType="section" width="100px" height="200px" />
            </Flex>
        )
    } else if (conversationList.length === 0) {
        conversations = <Text>You dont have any conversations yet.</Text>
    } else {
        conversations = conversationList.map((convo) => (
            <UserConversation key={uuid()} convo={convo} />
        ))
    }

    return (
        <Flex as="section" flexGrow={1}>
            <VStack
                // Conversations side-panel
                height="100%"
                as="aside"
                w={['100%', '100%', '50%', '45%', '30%']}
                borderRight="3px solid"
                borderRightColor="#2d3055"
                padding="1rem"
                display={checkIsSmallerThan700 ? convoView : 'flex'}
                overflowX="auto"
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
                <Flex flexDir="column" gap="0.5rem" width="100%">
                    {conversations}
                </Flex>
            </VStack>
            {currentConversation ? (
                <CurrentConversation />
            ) : (
                <Flex
                    w="70%"
                    maxW="70%"
                    display={checkIsSmallerThan700 ? 'none' : 'flex'}
                    flexDir="column"
                    align="center"
                >
                    <MainLogo />
                    <Divider mt="1rem" />
                    <Flex mt="1rem" px="1rem">
                        <Text fontSize="1.3rem" textAlign="center">
                            Langooo is a language exchange themed chat app.
                            <br />
                            <br />
                            You can view active conversations in the panel to
                            the left or discover fellow language learners by
                            clicking the
                            <Box as="span" mx="0.4rem" display="inline-block">
                                <Image
                                    mt="0.4rem"
                                    display="inline-block"
                                    src={IMAGES.chat2}
                                    filter={whiteFilter}
                                    boxSize="7"
                                />
                            </Box>
                            icon in the sidebar.
                        </Text>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}
