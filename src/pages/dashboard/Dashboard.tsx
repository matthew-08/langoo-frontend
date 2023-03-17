import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Views } from '../../types/types'
import Chat from './views/chat/Chat'
import Discover from './views/discover/Discover'
import Settings from './views/settings/Settings'
import { useAppDispatch } from '../../utils/hooks'
import { fetchUsers } from '../../features/usersSlice'
import useSocketSetup from '../../utils/socketSetup'

export default function Dashboard() {
    const [activeView, setActiveView] = useState<Views>('chat')
    useSocketSetup()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const currentActiveView = () => {
        switch (activeView) {
            case 'chat':
                return <Chat />
            case 'discover':
                return <Discover setActiveView={setActiveView} />
            case 'settings':
                return <Settings />
            default:
                return <Chat />
        }
    }
    const switchView = (view: Views) => setActiveView(view)

    return (
        <Flex
            as="main"
            justifyContent="center"
            align="center"
            height="100vh"
            minH="800px"
        >
            <Flex
                as="section"
                minW={['97%', '97%', '97%', '97%', '80%']}
                maxW={['97%', '97%', '97%', '97%', '80%']}
                minH={{ base: '90%', md: '80%' }}
                maxH="80vh"
                background="#232545"
                borderRadius="10px"
            >
                <Sidebar activeView={activeView} switchView={switchView} />
                <Flex as="section" flex="1" maxH="100%">
                    {currentActiveView()}
                </Flex>
            </Flex>
        </Flex>
    )
}
