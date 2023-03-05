import React from 'react';
import {
  Flex, Box, IconButton, Container,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import MessageInput from './MessageInput';
import react from '../../../assets/react.svg';
import Message from './Message';

interface CurrentConversationProps {
  mobileView: boolean,
  changeView?: () => void
  display: 'flex' | 'none'
  conversation: string[]
}

const messages = [
  {
    userId: 'booty', userIcon: react, messageContent: 'hello, this is a message', currentUser: true,
  },
  {
    userId: 'booty', userIcon: react, messageContent: 'hello, this is a message', currentUser: true,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is long like super long', currentUser: false,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is longaedg aedga edga edga edgiae dgaoed giajed o like super long', currentUser: true,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is longaedg aedga edga edga edgiae dgaoed giajed o like super long', currentUser: true,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is longaedg aedga edga edga edgiae dgaoed giajed o like super long', currentUser: true,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is longaedg aedga edga edga edgiae dgaoed giajed o like super long', currentUser: true,
  },
  {
    userId: 'user123', userIcon: react, messageContent: 'hello, this is a message it has some more content and it is longaedg aedga edga edga edgiae dgaoed giajed o like super long', currentUser: true,
  },

];

export default function CurrentConversation(
  {
    mobileView, changeView, display, conversation,
  }:CurrentConversationProps,
) {
  return (
    <Flex
      as="main"
      flex="1"
      display={display}
      flexDir="column"
      maxH="100%"
    >
      <Flex
        as="header"
        maxH="15%"
        minH="15%"
        minW="100%"
        borderColor="gray.100"
        borderBottom="2px"
        align="center"

      >
        {mobileView && (
        <IconButton
          aria-label="menu-icon"
          icon={(
            <ArrowBackIcon
              w="60px"
              h="60px"
              color="black"
            />
)}
        />
        )}

      </Flex>
      <Flex
        as="main"
        flex="1"
        flexDir="column-reverse"
        gap="1.5rem"
        padding="1rem"
        maxH="100%"
        overflow="auto"
      >
        <Box>
          {messages.map((message) => (
            <Message
              message={message}
            />
          ))}
        </Box>
      </Flex>
      <MessageInput />
    </Flex>

  );
}
