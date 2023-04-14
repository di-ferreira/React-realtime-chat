import { createContext, useContext, useState } from 'react';
import { iMessage, iRoomUser } from '../../@types';
import { socket } from '../../services';

interface iDataSocket {
  MessagesFromRoom: iMessage[];
  User: iRoomUser;
  userLogin: (user: iRoomUser) => void; //select_room
  sendMessage: (message: iMessage) => void;
}

const ContextChat = createContext({} as iDataSocket);

export const useChat = () => {
  return useContext(ContextChat);
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [MessagesFromRoom, setMessagesFromRoom] = useState<iMessage[]>([]);

  const [User, setUser] = useState<iRoomUser>({} as iRoomUser);

  socket.on('message', (data) => {
    setMessagesFromRoom(data);
  });

  const userLogin = (user: iRoomUser) => {
    setUser(user);
    socket.emit(
      'select_room',
      {
        userName: user.userName,
        room: user.room,
      },
      (messages: iMessage[]) => {
        setMessagesFromRoom(messages);
      }
    );
  };

  const sendMessage = (message: iMessage) => {
    socket.emit('message', message);
  };

  return (
    <ContextChat.Provider
      value={{
        MessagesFromRoom,
        User,
        userLogin,
        sendMessage,
      }}
    >
      {children}
    </ContextChat.Provider>
  );
};
