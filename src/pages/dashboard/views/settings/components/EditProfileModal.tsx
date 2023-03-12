/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Select,
    Divider,
    FormErrorMessage,
    Checkbox,
    CheckboxGroup,
    Image,
    Editable,
    EditablePreview,
    EditableInput,
    FormLabel,
    FormControl,
    Flex,
    useMediaQuery,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../../../utils/hooks'
import IMAGES from '../../../../../utils/images'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

interface Fields {
    nativeLanguage: string
    languages: string[]
}

export default function EditProfileModal({ isOpen, onClose, onOpen }: Props) {
    const [isBiggerThan700] = useMediaQuery('')
    const {
        register,
        formState: { errors },
    } = useForm<Fields>()
    const currentUser = useAppSelector((state) => state.authReducer.user)
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack as="form">
                        <FormControl>
                            <FormLabel>Username:</FormLabel>
                            <Editable
                                fontSize="2xl"
                                defaultValue={currentUser.username}
                            >
                                <EditablePreview />
                                <EditableInput as="input" />
                            </Editable>
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <FormLabel>Native Language:</FormLabel>
                            <Select
                                mt="1rem"
                                mb="1rem"
                                {...register('nativeLanguage', {
                                    required: true,
                                })}
                            >
                                <option value="english">English</option>
                                <option value="japanese">Japanese</option>
                                <option value="chinese">Chinese</option>
                                <option value="vietnamese">Vietnamese</option>
                                <option value="french">French</option>
                            </Select>
                        </FormControl>
                        <Divider />
                        <FormControl isInvalid={'language' in errors}>
                            <FormLabel as="legend">Studying:</FormLabel>
                            <CheckboxGroup
                                defaultValue={['japanese']}
                                size="lg"
                                mt="1rem"
                            >
                                <Flex
                                    gap="1rem"
                                    flexWrap="wrap"
                                    align={
                                        isBiggerThan700
                                            ? 'center'
                                            : 'flex-start'
                                    }
                                    flexDir={isBiggerThan700 ? 'row' : 'column'}
                                >
                                    <Checkbox
                                        icon={
                                            <Image src={IMAGES.flags.japan} />
                                        }
                                        {...register('languages', {
                                            required: false,
                                        })}
                                        value="japanese"
                                    >
                                        Japanese
                                    </Checkbox>
                                    <Checkbox
                                        value="chinese"
                                        icon={
                                            <Image src={IMAGES.flags.china} />
                                        }
                                        {...register('languages', {
                                            required: false,
                                        })}
                                    >
                                        Chinese
                                    </Checkbox>
                                    <Checkbox
                                        value="vietnamese"
                                        icon={
                                            <Image src={IMAGES.flags.vietnam} />
                                        }
                                        {...register('languages', {
                                            required: false,
                                        })}
                                    >
                                        Vietnamese
                                    </Checkbox>
                                    <Checkbox
                                        value="french"
                                        icon={
                                            <Image src={IMAGES.flags.france} />
                                        }
                                        {...register('languages', {
                                            required: false,
                                        })}
                                    >
                                        French
                                    </Checkbox>
                                    <Checkbox
                                        value="english"
                                        icon={
                                            <Image src={IMAGES.flags.england} />
                                        }
                                        {...register('languages', {
                                            required: false,
                                        })}
                                    >
                                        English
                                    </Checkbox>
                                </Flex>
                            </CheckboxGroup>
                            <FormErrorMessage>
                                {errors.languages?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button bgColor="blue.400" color="white">
                        Submit Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
