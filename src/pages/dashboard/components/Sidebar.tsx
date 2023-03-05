import React from 'react';
import {
  Flex, VStack, IconButton, Image, ButtonGroup,
  defineStyleConfig,
} from '@chakra-ui/react';
import chat from '../../../assets/chat.png';
import discover from '../../../assets/discover.png';
import settings from '../../../assets/settings.png';
import guy from '../../../assets/person.webp';

interface Props {
  switchView: (view: 'chat' | 'discover' | 'settings') => void
}

const whiteFilter = 'invert(100%) sepia(4%) saturate(7449%) hue-rotate(244deg) brightness(109%) contrast(94%)';

export default function Sidebar({ switchView }: Props) {
  return (
    <Flex
      minW={{ base: '15%', md: '7%' }}
      minH="100%"
      background="blue.400"
      as="aside"
      align="center"
      justify="center"
      flexDir="column"
      backgroundColor="#2d3055"
    >
      <Image
        src={guy}
        boxSize="80px"
        mb="auto"
        mt="1rem"
        borderRadius="full"
        border="4px"
        borderColor="blue.400"
      />
      <VStack
        gap="2rem"
        mb="auto"
        as={ButtonGroup}
        variant="outline"
        colorScheme="facebook"
        alignItems="center"
      >
        <IconButton
          aria-label="discover-cion"
          px={{ base: '0.6rem', md: '1rem' }}
          py={{ base: '1rem', md: '2rem' }}
          _focus={{
            borderColor: '#4299e1',
          }}
          icon={(
            <Image
              src={discover}
              width={{ base: '30px', md: '50px' }}
            />
)}
          onClick={() => switchView('discover')}
        />
        <IconButton
          aria-label="chat-icon"
          px="1rem"
          py="2rem"
          _focus={{
            borderColor: '#4299e1',
          }}
          icon={(
            <Image
              src={chat}
              filter={whiteFilter}
              width={{ base: '30px', md: '50px' }}
            />
)}
          onClick={() => switchView('chat')}
        />
        <IconButton
          px="1rem"
          py="2rem"
          aria-label="settings-icon"
          _focus={{
            borderColor: '#4299e1',
          }}
          icon={(
            <Image
              filter={whiteFilter}
              src={settings}
              width={{ base: '30px', md: '50px' }}
            />
)}
          onClick={() => switchView('settings')}
        />
      </VStack>
    </Flex>
  );
}
