import React, { useEffect, useState } from 'react';
import {
  VStack, Flex, Text, HStack, Circle,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';
import CurrentConversation from '../../components/CurrentConversation';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchConversations } from '../../../../features/convoSlice';
import UserConversation from '../../components/UserConversation';
import { isSmallerThan700, MobileViewOptions } from '../../../../features/viewSlice';

type Message = {
  user: string,
  msgId: string,
  msgContent: string,
};

export default function Chat() {
  const conversationList = useAppSelector((state) => state.convoSlice.conversations);
  const convoListLoading = useAppSelector((state) => state.convoSlice.loading);
  const haveFetchedConvos = useAppSelector((state) => state.convoSlice.fetched);
  const currentConversation = useAppSelector((state) => state.convoSlice.activeConvo);
  const dispatch = useAppDispatch();

  const [checkIsSmallerThan700] = useMediaQuery('(max-width: 700px)');

  const convoView = useAppSelector((state) => state.viewSlice.componentViews.allConversations);
  useEffect(() => {
    dispatch(isSmallerThan700(checkIsSmallerThan700));
  }, [checkIsSmallerThan700]);

  useEffect(() => {
    if (!haveFetchedConvos) {
      dispatch(fetchConversations());
    }
  }, []);

  let conversations;

  if (convoListLoading) {
    conversations = <div>Loading</div>;
  } else if (conversationList.length === 0) {
    conversations = <div>You dont have any conversations yet.</div>;
  } else {
    conversations = conversationList.map((convo) => (
      <UserConversation
        convo={convo}
      />
    ));
  }

  return (
    <Flex
      as="section"
      flex="1"
      maxH="100%"
    >
      <VStack
       // Conversations side-panel
        width={checkIsSmallerThan700 ? '100%' : '30%'}
        height="100%"
        as="aside"
        borderColor="gray.500"
        borderRight="2px solid"
        padding="1rem"
        display={checkIsSmallerThan700 ? convoView : 'flex'}
      >
        <HStack
          mr="auto"
        >
          <Heading
            fontSize="2xl"
          >
            Messages
          </Heading>
          <Circle
            background="red.400"
            size="30px"
            fontWeight="bold"
          >
            <Text>12</Text>
          </Circle>
        </HStack>
        { conversations }
      </VStack>
      {
        currentConversation
          ? (
            <CurrentConversation />
          )
          : ''
}
    </Flex>
  );
}
