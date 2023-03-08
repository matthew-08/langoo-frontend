import {
  Flex, IconButton, VStack, Text, Image, Container,
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import IMAGES from '../../../images';
import { Conversation } from '../../../types/types';
import { setActiveConvo } from '../../../features/convoSlice';
import { viewStatusSet } from '../../../features/viewSlice';

interface Props {
  convo : Conversation
}

export default function UserConversation({ convo }:Props) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.usersSlice.loading);
  const user = useAppSelector((state) => state.usersSlice.allUsers
    .find((u) => u.userId === convo.userId));
  const isMobileView = useAppSelector((state) => state.viewSlice.smallerThan700);
  const handleClick = () => {
    dispatch(setActiveConvo(convo.conversationId));
    if (isMobileView) {
      dispatch(viewStatusSet('userConversation'));
    }
  };
  return (
    <Flex
      maxW="100%"
      minW="100%"
      boxShadow="base"
      padding={['0.5rem', '0.7rem', '0.8rem', '.8rem', '1rem', '1.5rem']}
      borderRadius="10px"
      overflow="hidden"
      backgroundColor="#2d3055"
      align="center"
      cursor="pointer"
      onClick={() => handleClick()}
    >
      <IconButton
        aria-label="user-profile"
        minWidth={{ '2xl': '50px', xl: '30px' }}
        minHeight={{ '2xl': '50px', xl: '30px' }}
        background="none"
        mr="0.4rem"
        icon={(
          <Image
            src={user?.userImg}
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
            {user?.username}

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
