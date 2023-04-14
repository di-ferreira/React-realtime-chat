import { io } from 'socket.io-client';

const URL = 'http://localhost:3000/';
const URL_SOCKET = 'http://10.0.10.138:3000/';

export const socket = io(URL_SOCKET);
