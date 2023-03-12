import React from 'react';
import {
  Text, Flex, Image, Box, Container,
} from '@chakra-ui/react';
import timeago from 'epoch-timeago';
import { useAppSelector } from '../../../utils/hooks';
import { Message } from '../../../types/types';
import IMAGES from '../../../utils/images';
import getUserImage from '../../../utils/getUserImg';

export default function ChatMessage({ message }:{ message: Message }) {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const isCurrentUser = currentUser.userId === message.userId;

  let userImg;
  if (isCurrentUser) {
    userImg = getUserImage(currentUser.userImg);
  } else {
    const fetchOtherUser = useAppSelector((state) => state
      .usersSlice
      .allUsers
      .find((user) => user.userId === message.userId));
    userImg = getUserImage(fetchOtherUser?.userImg);
  }
  let chatMessage;

  let timestamp;
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - Number(message.timestamp) > 1800) {
    timestamp = timeago(message.timestamp);
  } else {
    timestamp = false;
  }

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
          src={userImg}
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
          src={userImg}
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
