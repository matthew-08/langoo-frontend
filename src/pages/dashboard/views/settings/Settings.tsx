import {
    AttachmentIcon,
    EditIcon,
    SettingsIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons'
import {
    Flex,
    Image,
    Box,
    HStack,
    VStack,
    Button,
    Text,
    Heading,
    ButtonGroup,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import IMAGES from '../../../../utils/images'
import ChangePhotoModal from './components/ChangePhotoModal'
import EditProfileModal from './components/EditProfileModal'
import Modal from './components/Modal'

export type ModalTypes = 'img' | 'profileDetails'

export default function Settings() {
    // eslint-disable-next-line react/no-unstable-nested-components
    const {
        isOpen: profileIsOpen,
        onOpen: profileOnOpen,
        onClose: profileOnClose,
    } = useDisclosure()
    const {
        isOpen: imgIsOpen,
        onOpen: imgOnOpen,
        onClose: imgOnClose,
    } = useDisclosure()

    return (
        <Flex
            as="section"
            minWidth="100%"
            justifyContent="center"
            align="center"
            flexDir="column"
        >
            <Heading mb="4rem">My Account:</Heading>
            <Flex
                width={['90%', '80%', '60%', '40% ']}
                background="#2d3055"
                borderRadius="10px"
                flexDir="column"
                align="center"
            >
                <Box>
                    <Image
                        src={IMAGES.guy}
                        borderRadius="full"
                        border="4px"
                        borderColor="white"
                        boxSize="100px"
                        margin="auto"
                        style={{
                            transform: 'translateY(-40px)',
                        }}
                    />
                </Box>
                <Flex flexDir="column" mb="1rem">
                    <Heading>John Doe</Heading>
                    <Text textAlign="center" fontSize="0.8rem" color="gray.400">
                        Supercoolemail@gmail.com
                    </Text>
                </Flex>
                <Flex
                    width="100%"
                    align="center"
                    justifyContent="center"
                    flexDir="column"
                    gap="0.4rem"
                >
                    <VStack>
                        <Heading textAlign="center" fontSize="1.3rem">
                            Studying:
                        </Heading>
                        <HStack>
                            <Text as="span">Japanese</Text>
                            <Image src={IMAGES.flags.japan} boxSize="20px" />
                            <Text as="span">Chinese</Text>
                            <Image src={IMAGES.flags.china} boxSize="20px" />
                        </HStack>
                    </VStack>
                    <Heading fontSize="1.3rem">Bio:</Heading>
                    <Text maxW="40ch" textAlign="center" mb="0.5rem">
                        Software developer, adventurer.
                    </Text>
                </Flex>
                <ButtonGroup>
                    <Button
                        mt="auto"
                        mb="20px"
                        leftIcon={<EditIcon />}
                        onClick={profileOnOpen}
                    >
                        Edit Details
                    </Button>
                    <Button
                        mt="auto"
                        mb="20px"
                        leftIcon={<AttachmentIcon />}
                        onClick={imgOnOpen}
                    >
                        Change Photo
                    </Button>
                </ButtonGroup>
            </Flex>
            <ChangePhotoModal
                isOpen={imgIsOpen}
                onOpen={imgOnOpen}
                onClose={imgOnClose}
            />
            <EditProfileModal
                isOpen={profileIsOpen}
                onOpen={profileOnOpen}
                onClose={profileOnClose}
            />
        </Flex>
    )
}
