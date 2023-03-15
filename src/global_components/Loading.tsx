import { Grid } from 'react-loader-spinner'
import { Flex } from '@chakra-ui/react'

interface LoadingProps {
    loadingType: 'fullPage' | 'section'
}

const Loading = ({ loadingType }: LoadingProps) => {
    if (loadingType === 'fullPage') {
        return (
            <Flex
                w={'100vw'}
                h="100vh"
                align={'center'}
                justify="center"
                overflowX={'hidden'}
                overflowY="hidden"
            >
                <Grid width={'300px'} height="300px" color="#90cdf4" />
            </Flex>
        )
    } else {
        return (
            <Flex w={'100vw'} h="100vh" align={'center'} justify="center">
                <Grid width={'300px'} height="300px" color="#90cdf4" />
            </Flex>
        )
    }
}

export default Loading
