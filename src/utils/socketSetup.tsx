import { useEffect } from 'react'
import socket from '../socket'

export default function useSocketSetup() {
    useEffect(() => {
        socket.connect()
        socket.on('connect_error', () => {
            console.log('connection error')
        })

        return () => {
            socket.off('connect_error')
        }
    }, [])
}
