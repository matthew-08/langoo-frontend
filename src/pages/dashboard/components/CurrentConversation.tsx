import React, { useEffect } from 'react';
import {
  Flex, Box, IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import MessageInput from './MessageInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchMessages, onMessage } from '../../../features/messagesSlice';
import ChatMessage from './ChatMessage';
import { Conversation } from '../../../types/types';
import socket from '../../../socket';
import ChatHeader from './ChatHeader';

export default function CurrentConversation() {
  const dispatch = useAppDispatch();
  const currentConvoView = useAppSelector(
    (state) => state.viewSlice.componentViews.userConversation,
  );
  const isMobileView = useAppSelector((state) => state.viewSlice.smallerThan700);
  const currentConvo = useAppSelector(
    (state) => state.convoSlice.conversations
      .find((convo) => convo.conversationId === state.convoSlice.activeConvo?.conversationId),
  ) as Conversation;
  const convoMessages = useAppSelector(
    (state) => (state.messagesSlice.conversationMessages[currentConvo.conversationId].messages),
  );

  useEffect(() => {
    socket.on('chat_message', (data) => {
      dispatch(onMessage(data));
    });
    return () => {
      socket.off('chat_message');
    };
  }, []);
  useEffect(() => {
    if (convoMessages.length === 0) {
      dispatch(fetchMessages(currentConvo.conversationId));
    }
    console.log('render of chat_message');
  }, []);

  return (
    <Flex
      as="main"
      flex="1"
      display={isMobileView ? currentConvoView : 'flex'}
      flexDir="column"
      maxH="100%"
    >
      <ChatHeader />
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
          {convoMessages
          && convoMessages.map((message) => (
            <ChatMessage
              key={message.timestamp}
              message={message}
            />
          ))}
        </Box>
      </Flex>
      <MessageInput
        convo={currentConvo}
      />
    </Flex>

  );
}
