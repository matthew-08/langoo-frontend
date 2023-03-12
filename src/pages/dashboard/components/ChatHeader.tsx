import {
  Flex, HStack, IconButton, Image, Text, useDisclosure, VStack,
  Modal, ModalOverlay,
  ModalContent, ModalFooter,
  ModalHeader, ModalCloseButton,
  ModalBody, ButtonGroup, Button,
} from '@chakra-ui/react';
import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons';
import timeago from 'epoch-timeago';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { viewStatusSet } from '../../../features/viewSlice';
import cat from '../../../assets/cat.jpg';
import IMAGES from '../../../utils/images';
import getflag from '../../../utils/getFlag';
import getUserImage from '../../../utils/getUserImg';
import { User } from '../../../types/types';

export default function ChatHeader() {
  const dispatch = useAppDispatch();
  const isMobileView = useAppSelector((state) => state.viewSlice.smallerThan700);
  const convoUser = useAppSelector((state) => state.convoSlice.activeConvo?.userId);
  const handleBackClick = () => {
    dispatch(viewStatusSet('allConversations'));
  };
  const userDetails = useAppSelector(
    (state) => state.usersSlice.allUsers.find((user) => user.userId === convoUser),
  ) as User;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      as="header"
      maxH="15%"
      minH="15%"
      minW="100%"
      borderBottom="3px solid"
      borderBottomColor="#2d3055"
      align="center"
    >
      {isMobileView && (
      <IconButton
        aria-label="menu-icon"
        onClick={() => handleBackClick()}
        icon={(
          <ArrowBackIcon
            w="60px"
            h="60px"
            color="black"
          />
)}
      />
      )}
      <HStack>
        <Image
          src={getUserImage(userDetails?.userImg)}
          boxSize="80px"
          borderRadius="full"
          border="4px"
          borderColor="blue.400"
          ml="0.5rem"
        />
        <VStack
          textAlign="left"
          align="flex-start"
        >
          <Text
            fontSize="2xl"
            mr="auto"
          >
            {userDetails?.username}
          </Text>
          <Text
            color="gray.200"
            fontSize="0.9rem"
            mr="auto"
          >
            {userDetails?.onlineStatus ? 'Online now'
              : `Last online: ${userDetails
                ? timeago(userDetails.lastLogin)
                : 'loading...'
              }`}
          </Text>
        </VStack>
      </HStack>
      <HStack
        ml="auto"
        mr="1rem"
        spacing="1"
      >
        <IconButton
          background="none"
          aria-label="account-info"
          onClick={onOpen}
          icon={(
            <Image
              filter="invert(99%) sepia(16%) saturate(218%) hue-rotate(232deg) brightness(113%) contrast(100%);"
              color="white"
              src={IMAGES.account}
            />)}
        />
        <IconButton
          background="none"
          aria-label="account-info"
          py="1rem"
          icon={(
            <WarningIcon
              boxSize="35px"
              color="red.200"
            />
          )}
        />
      </HStack>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            fontSize="4xl"
          >
            User Info:
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={Flex}
            flexDir="column"
            alignItems="center"
          >
            <Image
              width="80px"
              borderRadius="full"
              border="2px"
              borderColor="blue.400"
              src={IMAGES.guy}
              mb="1rem"
            />
            <VStack
              spacing="1rem"
            >
              <VStack>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  User:
                </Text>
                <Text
                  fontSize="1.2rem"
                >
                  {userDetails?.username}
                </Text>
              </VStack>
              <VStack>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  Native Language:
                </Text>
                <Text
                  fontSize="1.2rem"
                >
                  {userDetails?.nativeLanguage}
                </Text>
                <VStack>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                  >
                    Learning:
                  </Text>
                  <HStack>
                    {userDetails?.learningLanguages.map((lang) => (
                      <Image
                        w="20px"
                        src={getflag(lang)}
                      />
                    ))}
                  </HStack>
                </VStack>
                <VStack>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                  >
                    Bio:
                  </Text>
                  <Text
                    fontSize="1.2rem"
                  >
                    {userDetails?.bio || 'User doesn\'t yet have a bio.'}
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                rightIcon={<WarningIcon />}
              >
                Report user
              </Button>
              <Button
                onClick={onClose}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
