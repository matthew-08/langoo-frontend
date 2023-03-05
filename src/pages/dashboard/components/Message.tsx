import React from 'react';
import { Container, Text, Flex } from '@chakra-ui/react';

export default function Message({ message }) {
  return (
    <Flex
      maxW="40%"
      ml={message.currentUser ? 'auto' : ''}
      mr={message.currentUser ? '' : 'auto'}
      mb="1.2rem"
    >
      <Flex
        width="100%"
        backgroundColor={message.currentUser ? 'blue.400' : 'gray.200'}
        padding="1rem"
        borderRadius="10px"
      >
        <Text>
          {message.messageContent}
        </Text>
      </Flex>
    </Flex>
  );
}
