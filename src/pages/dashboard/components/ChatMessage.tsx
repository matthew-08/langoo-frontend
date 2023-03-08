import React from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks';
import { Message } from '../../../types/types';

export default function ChatMessage({ message }:{ message: Message }) {
  const currentUser = useAppSelector((state) => state.authReducer.user.userId);
  const isCurrentUser = currentUser === message.userId;
  return (
    <Flex
      maxW="40%"
      ml={isCurrentUser ? 'auto' : ''}
      mr={isCurrentUser ? '' : 'auto'}
      mb="1.2rem"
    >
      <Flex
        width="100%"
        backgroundColor={isCurrentUser ? 'blue.400' : 'gray.200'}
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
