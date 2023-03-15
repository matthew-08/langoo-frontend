import {
    Flex,
    VStack,
    IconButton,
    Image,
    ButtonGroup,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalOverlay,
    Text,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../utils/hooks'
import getUserImage from '../../../utils/getUserImg'
import IMAGES from '../../../utils/images'
import whiteFilter from '../../../utils/whiteFilter'
import SidebarButton from './SidebarButton'
import { useNavigate } from 'react-router-dom'
import { apiURL } from '../../../utils/apiUrl'

interface Props {
    switchView: (view: 'chat' | 'discover' | 'settings') => void
    activeView: 'chat' | 'discover' | 'settings'
}

const viewOptions = ['discover', 'chat', 'settings'] as const

export default function Sidebar({ switchView, activeView }: Props) {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useAppSelector((state) => state.authReducer.user)
    const handleLogOut = async () => {
        await fetch(`${apiURL}/auth/logout`, {
            credentials: 'include',
        }).then((res) => {
            navigate('/')
        })
    }
    return (
        <Flex
            minW={{ base: '16%', md: '7%' }}
            minH="100%"
            background="blue.400"
            as="aside"
            align="center"
            justify="center"
            flexDir="column"
            backgroundColor="#2d3055"
            borderTopLeftRadius="10px"
            borderBottomLeftRadius="10px"
        >
            <Image
                src={getUserImage(user.userImg)}
                boxSize={{ base: '55px', md: '80px' }}
                mb="auto"
                mt="1rem"
                padding="0.2rem"
                borderRadius="full"
                border="2px"
            />
            <VStack
                gap="1.5rem"
                mb="auto"
                as={ButtonGroup}
                variant="outline"
                colorScheme="facebook"
                alignItems="center"
            >
                {viewOptions.map((view) => (
                    <SidebarButton
                        activeView={activeView}
                        buttonType={view}
                        switchView={switchView}
                    />
                ))}
                <IconButton
                    px={{ base: '0.6rem', md: '1rem' }}
                    py={{ base: '1rem', md: '2rem' }}
                    aria-label="settings-icon"
                    border="none"
                    _focus={{
                        borderColor: '#4299e1',
                    }}
                    icon={
                        <Image
                            filter={whiteFilter}
                            src={IMAGES.logout}
                            width="40px"
                        />
                    }
                    onClick={onOpen}
                />
            </VStack>
            <IconButton
                aria-label="github"
                href="http://github.com/matthew-08"
                as="a"
                mb="0.5rem"
                icon={<Image w="30px" src={IMAGES.github} />}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Logout</ModalHeader>
                    <ModalBody>
                        <Text m="auto">Continue logging out?</Text>
                    </ModalBody>
                    <ModalCloseButton />
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={handleLogOut}>Log out</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
