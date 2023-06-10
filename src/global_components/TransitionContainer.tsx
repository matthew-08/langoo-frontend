import { Fade } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

function TransitionContainer({ children }: { children: ReactNode }) {
    return <Fade in>{children}</Fade>
}

export default TransitionContainer
