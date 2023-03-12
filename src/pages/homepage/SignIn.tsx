/* eslint-disable react/jsx-props-no-spreading */
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ButtonGroup,
    Heading,
    VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { isFulfilled } from '@reduxjs/toolkit'
import { logInAttempt } from '../../features/authSlice'
import { useAppDispatch } from '../../utils/hooks'
import { LoginForm } from '../../types/types'

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters long')
        .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string().required('Password is required'),
})
function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        setError,
    } = useForm<LoginForm>({
        resolver: yupResolver(validationSchema),
    })
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onSubmit = async (data: LoginForm) => {
        await dispatch(logInAttempt(data)).then((res) => {
            if (isFulfilled(res)) {
                return navigate('/chat')
            }
            return setError({
                type: res.payload?.type,
                message: res.payload?.status,
            })
        })
    }

    const isError = (input: keyof LoginForm) => !!errors[input]

    return (
        <VStack
            as="form"
            w={{ base: '90%', md: '500px' }}
            m="auto"
            align="center"
            spacing="1rem"
            border="1px"
            borderColor="blue.400"
            padding="1rem"
            borderRadius="20px"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Heading>Log In:</Heading>
            <FormControl isInvalid={isError('username')}>
                <FormLabel fontSize="2xl">Username:</FormLabel>
                <Input
                    {...register('username', { required: true })}
                    placeholder="Enter Username"
                    autoComplete="off"
                    size="lg"
                />
                <FormErrorMessage color="red">
                    {errors.username?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isError('password')}>
                <FormLabel fontSize="2xl">Password:</FormLabel>
                <Input
                    {...register('password')}
                    placeholder="Password"
                    autoComplete="off"
                    size="lg"
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup size="lg" padding="1rem">
                <Button
                    disabled={Object.keys(dirtyFields).length !== 0}
                    backgroundColor="blue.400"
                    type="submit"
                >
                    Login
                </Button>
                <Button
                    disabled={!dirtyFields}
                    onClick={() => navigate('/register')}
                >
                    Create Account
                </Button>
            </ButtonGroup>
        </VStack>
    )
}

export default SignIn
