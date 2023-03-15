import React from 'react'
import { Flex } from '@chakra-ui/react'
import IMAGES from '../utils/images'
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

function MainLogo() {
    return (
        <Flex as={'header'} align="center" mb={'0.5rem'} mt="2rem">
            <Image src={IMAGES.loginIcon} w="55px" mb={'0.5rem'} />
            <Heading fontSize={'4xl'}>
                Lang
                <Text as="span" color="blue.200">
                    ooo
                </Text>
            </Heading>
        </Flex>
    )
}

export default MainLogo
