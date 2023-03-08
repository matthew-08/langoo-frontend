import React, { useState } from 'react';
import {
  HStack, IconButton, Input, Flex, InputGroup, InputLeftAddon,
} from '@chakra-ui/react';
import { AttachmentIcon, ChatIcon } from '@chakra-ui/icons';
import { Conversation } from '../../../types/types';
import socket from '../../../socket';
import { onMessage } from '../../../features/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

function MessageInput({ convo }:{ convo:Conversation | undefined }) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.authReducer.user.userId);
  const [input, setInput] = useState<string>('');
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (convo) {
      const date = new Date().getTime();
      console.log('sending emit _private_chat');
      socket.emit('private_chat', {
        message: {
          timestamp: date,
          content: input,
          userId: currentUser,
        },
        conversationId: convo.conversationId,
        to: convo.userId,
      });
      console.log('sending');
      dispatch(onMessage({
        conversationId: convo.conversationId,
        message: {
          content: input,
          timestamp: date,
          userId: currentUser as string,
        },
      }));
    }
  };
  console.log(convo);
  return (
    <HStack
      width="100%"
      pl="1rem"
      pr="1rem"
      mt="auto"
      pb="1rem"
    >
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
            onChange={(e) => setInput(e.target.value)}
          />

        </InputGroup>
        <IconButton
          aria-label="submit-button"
          border="2px"
          borderColor="blue.200"
          borderRadius="50%"
          backgroundColor="blue.200"
          type="submit"
          icon={(
            <ChatIcon
              color="white"
            />
)}
        />
      </Flex>
    </HStack>
  );
}

export default MessageInput;
