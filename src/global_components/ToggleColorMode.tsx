import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'

export default function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button
            position="absolute"
            top="0"
            right="0"
            margin="1rem"
            onClick={() => toggleColorMode()}
        >
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}
