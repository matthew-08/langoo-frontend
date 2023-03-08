import { useEffect } from 'react';
import socket from './socket';

export default function useSocketSetup() {
  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      console.log('connection error');
    });

    socket.on('users', (users) => {
      console.log(users);
    });

    return () => {
      socket.off('connect_error');
    };
  }, []);
}
