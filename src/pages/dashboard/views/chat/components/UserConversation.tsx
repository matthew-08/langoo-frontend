import { Flex, IconButton, VStack, Text, Image } from '@chakra-ui/react'
import timeago from 'epoch-timeago'
import { useAppSelector, useAppDispatch } from '../../../../../utils/hooks'
import { Conversation } from '../../../../../types/types'
import { setActiveConvo } from '../../../../../features/convoSlice'
import { viewStatusSet } from '../../../../../features/viewSlice'
import getUserImage from '../../../../../utils/getUserImg'
import getflag from '../../../../../utils/getFlag'

interface Props {
    convo: Conversation
}

export default function UserConversation({ convo }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) =>
        state.usersSlice.allUsers.find((u) => u.userId === convo.userId)
    )
    const isMobileView = useAppSelector(
        (state) => state.viewSlice.smallerThan700
    )
    const currentUserId = useAppSelector(
        (state) => state.authReducer.user.userId
    )
    const lastMessage = useAppSelector((state) =>
        state.messagesSlice.conversationMessages[
            convo.conversationId
        ].messages.at(-1)
    )
    const handleClick = () => {
        dispatch(setActiveConvo(convo.conversationId))
        if (isMobileView) {
            dispatch(viewStatusSet('userConversation'))
        }
    }
    const lastMessageIsUsers = lastMessage?.userId === currentUserId
    const isActiveConvo = useAppSelector(
        (state) =>
            state.convoSlice.activeConvo?.conversationId ===
            convo.conversationId
    )
    return (
        <Flex
            boxShadow="base"
            minW="100%"
            padding={['0.5rem', '0.7rem', '0.8rem', '.8rem', '1rem', '1.5rem']}
            borderRadius="10px"
            overflow="hidden"
            minH="100px"
            backgroundColor={isActiveConvo ? 'blue.600' : '#2d3055'}
            align="center"
            cursor="pointer"
            position="relative"
            onClick={() => handleClick()}
        >
            <Flex mr="0.8rem" position="relative">
                <IconButton
                    position="relative"
                    aria-label="user-profile"
                    minWidth={{ '2xl': '50px', xl: '30px' }}
                    minHeight={{ '2xl': '50px', xl: '30px' }}
                    background="none"
                    icon={
                        <Image
                            src={getUserImage(user?.userImg)}
                            boxSize="70px"
                            borderRadius="full"
                            border="4px"
                            borderColor="blue.400"
                        />
                    }
                />
                <Image
                    boxSize="20px"
                    position="absolute"
                    bottom="0"
                    src={getflag(user?.nativeLanguage)}
                />
            </Flex>
            <VStack
                textAlign="left"
                align="flex-start"
                flex="1"
                fontSize={['1rem', '0.8rem', '0.9rem', '0.9rem', '1.3rem']}
                overflow="hidden"
            >
                <Flex justify="space-between" align="center" minW="100%">
                    <Text fontWeight="bold" isTruncated maxW="180px">
                        {user?.username}
                    </Text>
                    <Text fontSize={['0.7rem', '0.8rem']} textAlign="right">
                        {lastMessage?.timestamp
                            ? timeago(lastMessage?.timestamp)
                            : ''}
                    </Text>
                </Flex>
                <Text isTruncated fontSize="1rem" maxW="25ch">
                    {lastMessage?.content || ''}
                </Text>
                {/* {!lastMessageIsUsers && (
                    <Flex
                        fontSize="0.8rem"
                        position="absolute"
                        right="1"
                        bottom="1"
                        border="1px"
                        px="0.4rem"
                        borderRadius="10px"
                        background="green.100"
                        color="blue.900"
                        fontWeight="bold"
                    >
                        Your turn!
                    </Flex>
                )} */}
            </VStack>
        </Flex>
    )
}
