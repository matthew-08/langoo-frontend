import { Flex, Fade, Box } from '@chakra-ui/react'
import React from 'react'
import TransitionContainer from '../../global_components/TransitionContainer'
import RegisterForm from './components/RegisterForm'
import MainLogo from '../../global_components/MainLogo'

export default function Register() {
    return (
        <TransitionContainer>
            <Flex as="main" flexDir="column" maxH="100vh" overflow="hidden">
                <Box ml="3rem">
                    <MainLogo />
                </Box>
                <RegisterForm />
            </Flex>
        </TransitionContainer>
    )
}
