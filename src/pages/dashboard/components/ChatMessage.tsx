import React from 'react';
import { Text, Flex, Image } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks';
import { Message } from '../../../types/types';
import IMAGES from '../../../images';

export default function ChatMessage({ message }:{ message: Message }) {
  const currentUser = useAppSelector((state) => state.authReducer.user.userId);
  const isCurrentUser = currentUser === message.userId;
  let chatMessage;

  if (isCurrentUser) {
    chatMessage = (
      <Flex
        maxW="40%"
        ml={isCurrentUser ? 'auto' : ''}
        mr={isCurrentUser ? '' : 'auto'}
        mb="1.2rem"
      >
        <Flex
          width="100%"
          backgroundColor={isCurrentUser ? 'blue.400' : '#405375'}
          padding="1rem"
          borderRadius="10px"
        >
          <Text>
            {message.content}
          </Text>
        </Flex>
        <Image
          mt="auto"
          boxSize="40px"
          borderRadius="full"
          src={IMAGES.guy}
          ml="0.5rem"
        />
      </Flex>
    );
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
          src={IMAGES.guy}
        />
        <Flex
          width="100%"
          backgroundColor={isCurrentUser ? 'blue.400' : '#405375'}
          padding="1rem"
          borderRadius="10px"
        >
          <Text>
            {message.content}
          </Text>
        </Flex>
      </Flex>
    );
  }
  return (
    chatMessage
  );
}
