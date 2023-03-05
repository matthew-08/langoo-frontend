import React from 'react';
import {
  HStack, IconButton, Input, Flex, InputGroup, InputLeftAddon,
} from '@chakra-ui/react';
import { AttachmentIcon, ChatIcon } from '@chakra-ui/icons';

function MessageInput() {
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
          />

        </InputGroup>
        <IconButton
          aria-label="submit-button"
          border="2px"
          borderColor="blue.200"
          borderRadius="50%"
          backgroundColor="blue.200"
          _hover="none"
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
