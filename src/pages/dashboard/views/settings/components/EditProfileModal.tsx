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
    FormLabel,
    FormControl,
    Flex,
    useMediaQuery,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import IMAGES from '../../../../../utils/images'
import { LanguageChoices } from '../../../../../types/types'
import { checkForSession } from '../../../../../features/authSlice'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

interface Fields {
    nativeLanguage: LanguageChoices
    languages: LanguageChoices[]
    username: string
    bio: string | null
}

const editProfileSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    languages: Yup.array().min(1, 'You must choose at least one language'),
})

export default function EditProfileModal({ isOpen, onClose, onOpen }: Props) {
    const dispatch = useAppDispatch()
    const [isBiggerThan700] = useMediaQuery('')
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const submitChanges = async (data: Fields) => {
        const dataToPut = {
            updatedInfo: data,
            userId: currentUser.userId,
        }
        await fetch('http://localhost:3000/userInfo/updateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToPut),
            credentials: 'include',
        }).then((res) => {
            dispatch(checkForSession())
            return onClose()
        })
    }
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm<Fields>({
        resolver: yupResolver(editProfileSchema),
        defaultValues: {
            username: currentUser.username!,
            nativeLanguage: currentUser.nativeLanguage!,
            languages: currentUser.learningLanguages!,
            bio: currentUser.bio!,
        },
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form">
                    <VStack>
                        <FormControl isInvalid={'username' in errors}>
                            <FormLabel>Username:</FormLabel>
                            <Input
                                type="text"
                                {...register('username', {
                                    required: true,
                                })}
                                defaultValue={currentUser.username!}
                            />
                            <FormErrorMessage>
                                {errors.username?.message}
                            </FormErrorMessage>
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
                        <FormControl isInvalid={'languages' in errors}>
                            <FormLabel as="legend">Studying:</FormLabel>
                            <CheckboxGroup
                                defaultValue={currentUser.learningLanguages!}
                                size="lg"
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
                        <Divider />
                        <FormControl>
                            <FormLabel>Bio:</FormLabel>
                            <Textarea
                                fontSize="1.2rem"
                                defaultValue={
                                    currentUser.bio ||
                                    "You don't have a bio yet.  Click to write one!"
                                }
                                {...register('bio')}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        type="submit"
                        bgColor="blue.400"
                        color="white"
                        onClick={handleSubmit(submitChanges)}
                    >
                        Submit Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
