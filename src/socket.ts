import { io } from 'socket.io-client';
import { apiURL } from './utils/apiUrl';

const socket = io(`${apiURL}`, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
