/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
    HStack,
    Image,
    FormHelperText,
    CheckboxGroup,
    Checkbox,
    Select,
    Flex,
    useMediaQuery,
    Text,
    IconButton,
    RadioGroup,
    Radio,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'react-router-dom'
import { useState } from 'react'
import IMAGES from '../../../utils/images'
import { SignUpForm } from '../../../types/types'
import { registerAttempt } from '../../../features/authSlice'
import { useAppDispatch } from '../../../utils/hooks'
import whiteFilter from '../../../utils/whiteFilter'

const signUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
        .required('This field is required')
        .email('email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    languages: Yup.array().min(1, 'You must choose at least one language'),
})

type ProfilePic = 'girl' | 'boy' | null

export default function RegisterForm() {
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: yupResolver(signUpSchema),
    })
    const dispatch = useAppDispatch()
    const [isBiggerThan700] = useMediaQuery('(min-width: 800px)')
    const submitData = async (data: SignUpForm) => {
        const attemptRegister = await dispatch(registerAttempt(data))
        if (registerAttempt.fulfilled.match(attemptRegister)) {
            return redirect('/chat')
        }
        if (attemptRegister.payload) {
            return setError('username', {
                type: 'custom',
                message: attemptRegister.payload.status,
            })
        }
        return null
    }

    const checkInvalid = (input: keyof SignUpForm) => !!errors[input]

    return (
        <VStack
            as="form"
            spacing="2"
            onSubmit={handleSubmit(submitData)}
            width={isBiggerThan700 ? '60%' : '95%'}
            px={['0.7rem', '1.2rem']}
            py="1rem"
            margin="auto"
        >
            <Heading mb="1rem">Sign Up</Heading>
            <Flex
                justify="center"
                flexDir={isBiggerThan700 ? 'row' : 'column'}
                gap="1rem"
                width={isBiggerThan700 ? '80%' : '100%'}
            >
                <FormControl isInvalid={checkInvalid('username')}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        {...register('username', { required: true })}
                        size="lg"
                        type="text"
                        placeholder="Enter Username..."
                    />
                    <FormErrorMessage>
                        {errors.username?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={checkInvalid('email')}>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        {...register('email', { required: true })}
                        size="lg"
                        type="email"
                        placeholder="Enter Email..."
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
            </Flex>
            <Flex
                justify="center"
                flexDir={isBiggerThan700 ? 'row' : 'column'}
                gap="1rem"
                width={isBiggerThan700 ? '80%' : '100%'}
            >
                <FormControl isInvalid={checkInvalid('password')}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        {...register('password', { required: true })}
                        size="lg"
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={checkInvalid('confirmPassword')}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        {...register('confirmPassword', { required: true })}
                        size="lg"
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.confirmPassword?.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            <FormControl maxW={isBiggerThan700 ? '55%' : '80%'} pb="1rem">
                <FormLabel>Choose your native language:</FormLabel>
                <Select {...register('nativeLanguage', { required: true })}>
                    <option value="english">English</option>
                    <option value="japanese">Japanese</option>
                    <option value="chinese">Chinese</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="french">French</option>
                </Select>
            </FormControl>
            <HStack
                padding="1.5rem"
                border="1px"
                borderRadius="10px"
                as={Flex}
                flexWrap="wrap"
            >
                <FormControl isInvalid={checkInvalid('languages')}>
                    <FormLabel as="legend" fontSize="1.5rem">
                        What languages are you studying?
                    </FormLabel>
                    <CheckboxGroup defaultValue={['japanese']} size="lg">
                        <Flex
                            gap="1rem"
                            flexWrap="wrap"
                            align={isBiggerThan700 ? 'center' : 'flex-start'}
                            flexDir={isBiggerThan700 ? 'row' : 'column'}
                        >
                            <Checkbox
                                icon={<Image src={IMAGES.flags.japan} />}
                                {...register('languages', { required: false })}
                                value="japanese"
                            >
                                Japanese
                            </Checkbox>
                            <Checkbox
                                value="chinese"
                                icon={<Image src={IMAGES.flags.china} />}
                                {...register('languages', { required: false })}
                            >
                                Chinese
                            </Checkbox>
                            <Checkbox
                                value="vietnamese"
                                icon={<Image src={IMAGES.flags.vietnam} />}
                                {...register('languages', { required: false })}
                            >
                                Vietnamese
                            </Checkbox>
                            <Checkbox
                                value="french"
                                icon={<Image src={IMAGES.flags.france} />}
                                {...register('languages', { required: false })}
                            >
                                French
                            </Checkbox>
                            <Checkbox
                                value="english"
                                icon={<Image src={IMAGES.flags.england} />}
                                {...register('languages', { required: false })}
                            >
                                English
                            </Checkbox>
                        </Flex>
                    </CheckboxGroup>
                    <FormHelperText>
                        * Due to low server capacity, we can only provide a
                        select few languages.
                    </FormHelperText>
                    <FormErrorMessage>
                        {errors.languages?.message}
                    </FormErrorMessage>
                </FormControl>
            </HStack>
            <HStack>
                <VStack />
            </HStack>
            <ButtonGroup size="lg">
                <Button
                    mt="1rem"
                    type="submit"
                    size="lg"
                    variant="solid"
                    colorScheme="blue"
                >
                    Create Account
                </Button>
            </ButtonGroup>
        </VStack>
    )
}
