import React from 'react'
import {
    GridItem,
    Box,
    Image,
    VStack,
    HStack,
    Heading,
    Text,
    Circle,
    Flex,
    Button,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import { User, SetActiveView } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import { addConvo, setActiveConvo } from '../../../../../features/convoSlice'
import getflag from '../../../../../utils/getFlag'
import { viewStatusSet } from '../../../../../features/viewSlice'
import getUserImage from '../../../../../utils/getUserImg'

export default function PersonCard({
    user,
    setActiveView,
}: {
    user: User
    setActiveView: SetActiveView
}) {
    const dispatch = useAppDispatch()
    const convoExists = useAppSelector((state) =>
        state.convoSlice.conversations.find(
            (convo) => convo.userId === user.userId
        )
    )
    const isSmallerThan700 = useAppSelector(
        (state) => state.viewSlice.smallerThan700
    )

    const handleClick = () => {
        if (isSmallerThan700) {
            dispatch(viewStatusSet('userConversation'))
        }
        if (convoExists) {
            dispatch(setActiveConvo(convoExists.conversationId))
            setActiveView('chat')
        } else {
            dispatch(addConvo(user.userId)).then(() => setActiveView('chat'))
        }
    }
    console.log(user.learningLanguages)
    return (
        <GridItem
            borderRadius="10px"
            as={Flex}
            background="#2d3055"
            alignItems="center"
            px="0.5rem"
            padding={['0.1rem', '1rem']}
            position="relative"
            maxH="140px"
            boxShadow="lg"
            overflowY="hidden"
            onClick={() => (isSmallerThan700 ? handleClick() : null)}
        >
            <Box position="relative">
                <Image
                    src={getUserImage(user.userImg)}
                    boxSize={['80px', '100px']}
                    borderRadius="full"
                />
                <Image
                    width={['20px', '30px']}
                    position="absolute"
                    bottom="5px"
                    left="-5px"
                    src={getflag(user.nativeLanguage)}
                />
            </Box>
            <VStack align="flex-start" ml="1rem">
                <HStack justifyContent="space-between" minW="100%">
                    <Heading fontSize={['1.3rem', '1.7rem']} textAlign="left">
                        {user.username}
                    </Heading>
                    <Box
                        position="absolute"
                        right="10px"
                        top="10px"
                        as={Flex}
                        alignItems="center"
                        justifyContent="center"
                        gap="0.3rem"
                    >
                        <Text fontSize={['0.7rem', '1rem']}>
                            {user.onlineStatus ? 'Online' : ''}
                        </Text>
                        <Circle
                            size="17px"
                            background={
                                user.onlineStatus ? 'green.200' : 'tomato'
                            }
                        />
                    </Box>
                </HStack>
                <Text fontSize={['0.8rem', '1rem']}>{user.bio}</Text>
                <HStack>
                    <Text fontSize={['0.8rem', '1rem']}>Learning:</Text>
                    {user.learningLanguages.map((lang) => (
                        <Image
                            src={getflag(lang)}
                            w={['15px', '20px']}
                            key={uuidv4()}
                        />
                    ))}
                </HStack>
            </VStack>
            <Button
                position="absolute"
                bottom="10px"
                right="10px"
                cursor="pointer"
                display={isSmallerThan700 ? 'none' : 'block'}
                leftIcon={<ChatIcon />}
                onClick={() => handleClick()}
            >
                Chat
            </Button>
        </GridItem>
    )
}
