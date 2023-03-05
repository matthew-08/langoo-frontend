import {
  Flex, IconButton, VStack, Text, Image, Container,
} from '@chakra-ui/react';
import react from '../../../assets/react.svg';
import IMAGES from '../../../images';

export default function Conversation({ chooseConversation }) {
  const conversationId = '123';
  return (
    <Flex
      maxW="100%"
      minW="100%"
      boxShadow="base"
      padding={['0.5rem', '0.7rem', '0.8rem', '.8rem', '1rem', '1.5rem']}
      borderRadius="10px"
      overflow="hidden"
      onClick={() => chooseConversation()}
      backgroundColor="#2d3055"
      align="center"
      cursor="pointer"
    >
      <IconButton
        aria-label="user-profile"
        minWidth={{ '2xl': '50px', xl: '30px' }}
        minHeight={{ '2xl': '50px', xl: '30px' }}
        background="none"
        mr="0.4rem"
        icon={(
          <Image
            src={IMAGES.guy}
            boxSize="70px"
            borderRadius="full"
            border="4px"
            borderColor="blue.400"
          />
)}
      />
      <VStack
        textAlign="left"
        align="flex-start"
        flex="1"
        fontSize={['1rem', '0.8rem', '0.9rem', '0.9rem', '1.3rem']}
        overflow="hidden"
      >
        <Flex
          justify="space-between"
          align="center"
          minW="100%"
          overflow="hidden"
        >
          <Text
            fontWeight="bold"
          >
            Person

          </Text>
          <Text
            fontSize="0.8rem"
          >
            4:24
          </Text>
        </Flex>
        <Text
          isTruncated
          maxW="100%"
        >
          This is message eagr aegadg eda

        </Text>
      </VStack>
    </Flex>
  );
}
