import React, { useState } from 'react';
import {
  VStack, Flex, Text, HStack, Circle,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';
import Conversation from '../../components/Conversation';
import CurrentConversation from '../../components/CurrentConversation';

type Message = {
  user: string,
  msgId: string,
  msgContent: string,
};

type MobileViewOptions = 'allConversations' | 'userConversation';

export default function Chat() {
  const [currentUserConversation, setCurrentUserConversation] = useState<Message[]>(
    [{ user: 'person', msgContent: 'hello', msgId: '123' }],
  );
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
  const [userMobileView, setUserMobileView] = useState<MobileViewOptions>('allConversations');

  const getViewStatus = (component: 'allConversations' | 'userConversation') => {
    if (userMobileView === component) {
      console.log(userMobileView);
      return 'flex';
    }

    return 'none';
  };

  const chooseConversation = () => {
    console.log('check');
    if (isSmallerThan700) {
      setCurrentUserConversation([{ user: 'person', msgContent: 'hello', msgId: '123' }]);
      setUserMobileView((prev) => 'userConversation');
    } else {
      setCurrentUserConversation([{ user: 'person', msgContent: 'hello', msgId: '123' }]);
    }
  };

  return (
    <Flex
      as="section"
      flex="1"
      maxH="100%"
    >
      <VStack
       // Conversations side-panel
        width={isSmallerThan700 ? '100%' : '30%'}
        height="100%"
        as="aside"
        borderColor="gray.500"
        borderRight="2px solid"
        padding="1rem"
        display={isSmallerThan700 ? getViewStatus('allConversations') : 'flex'}
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
        <Conversation
          chooseConversation={chooseConversation}
        />
      </VStack>
      <CurrentConversation
        display={isSmallerThan700 ? getViewStatus('userConversation') : 'flex'}
        mobileView={!!isSmallerThan700}
        changeView={() => 'ok'}
      />
    </Flex>
  );
}
