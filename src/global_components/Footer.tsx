import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function Footer() {
    return (
        <Flex
            as="footer"
            width="100%"
            position="absolute"
            bottom="0"
            align="center"
            justify="center"
            mt="3rem"
        >
            <Text>Made by {'   '}</Text>
            <Text
                ml="0.2rem"
                color="blue.400"
                as="a"
                href="http://github.com/matthew-08"
            >
                Matthew Crosby
            </Text>
        </Flex>
    )
}

export default Footer
