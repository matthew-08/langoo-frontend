/* eslint-disable react/require-default-props */
import { Grid } from 'react-loader-spinner'
import { Flex } from '@chakra-ui/react'

interface LoadingProps {
    loadingType: 'fullPage' | 'section'
    width?: string
    height?: string
}

function Loading({ loadingType, width = '80', height = '80' }: LoadingProps) {
    if (loadingType === 'fullPage') {
        return (
            <Flex
                w="100vw"
                h="100vh"
                align="center"
                justify="center"
                overflowX="hidden"
                overflowY="hidden"
            >
                <Grid width="300px" height="300px" color="#90cdf4" />
            </Flex>
        )
    }
    return <Grid color="#90cdf4" width={width} height={height} />
}

export default Loading
