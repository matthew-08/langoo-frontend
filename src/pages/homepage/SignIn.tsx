/* eslint-disable react/jsx-props-no-spreading */
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ButtonGroup,
    Heading,
    Text,
    VStack,
    Flex,
    Image,
    InputGroup,
    Icon,
    InputLeftElement,
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
import IMAGES from '../../utils/images'
import { AiOutlineUser } from 'react-icons/ai'
import { LockIcon } from '@chakra-ui/icons'

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
            return setError('root', {
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
            padding="1rem"
            borderRadius="20px"
            backgroundColor={'whiteAlpha.100'}
            onSubmit={handleSubmit(onSubmit)}
            mt="4rem"
        >
            <Flex as={'header'} align="center" mb={'0.5rem'} mt="2rem">
                <Image src={IMAGES.loginIcon} w="55px" mb={'0.5rem'} />
                <Heading fontSize={'4xl'}>
                    Lang
                    <Text as="span" color="blue.200">
                        ooo
                    </Text>
                </Heading>
            </Flex>
            <FormControl isInvalid={isError('username')}>
                <FormLabel fontSize="2xl">Username:</FormLabel>
                <InputGroup>
                    <Input
                        {...register('username', { required: true })}
                        placeholder="Enter Username"
                        autoComplete="off"
                        size="lg"
                    />
                    <InputLeftElement
                        children={
                            <Icon boxSize={6} mt="0.5rem" as={AiOutlineUser} />
                        }
                    />
                </InputGroup>
                <FormErrorMessage color="red">
                    {errors.username?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isError('password')}>
                <FormLabel fontSize="2xl">Password:</FormLabel>
                <InputGroup>
                    <Input
                        {...register('password')}
                        placeholder="Password"
                        autoComplete="off"
                        size="lg"
                    />
                    <InputLeftElement children={<LockIcon mt={'0.5rem'} />} />
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Text ml={'auto'} w="100%">
                Forgot your password?
                <Text as={'a'} color="blue.400">
                    {' '}
                    Click here.
                </Text>
            </Text>
            <VStack
                as={ButtonGroup}
                size="lg"
                padding="0.2rem"
                alignContent={'center'}
                justifyContent="center"
                width={'100%'}
                pb="2rem"
            >
                <Button
                    disabled={Object.keys(dirtyFields).length !== 0}
                    backgroundColor="blue.300"
                    _hover={{
                        backgroundColor: 'blue.400',
                    }}
                    color="white"
                    type="submit"
                    width="100%"
                >
                    Login
                </Button>
                <Button
                    disabled={!dirtyFields}
                    onClick={() => navigate('/register')}
                    width="100%"
                    variant={'outline'}
                    color="blue.200"
                    border={'2px'}
                    borderColor="blue.200"
                >
                    Sample Account
                </Button>
                <Text>
                    Don't have an account?{' '}
                    <Text
                        as={'a'}
                        color="blue.400"
                        cursor={'pointer'}
                        onClick={() => navigate('/register')}
                    >
                        Sign up now!
                    </Text>
                </Text>
            </VStack>
        </VStack>
    )
}

export default SignIn
