import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iMessage } from '../../@types';
import { socket } from '../../services';
import dayjs from 'dayjs';

const Chat: React.FC = () => {
  const navigate = useNavigate();

  const [ListMessages, setListMessages] = useState<iMessage[]>([]);

  const [CurrentUser, setCurrentUser] = useState<iMessage>({} as iMessage);

  const [InputValue, setInputValue] = useState('');

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const onExit = () => {
    localStorage.removeItem('@UserChat');
    navigate('/login', { replace: true });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setCurrentUser({
      ...CurrentUser,
      text: value,
    });
  };

  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newMessage: iMessage = {
      room: CurrentUser.room,
      username: CurrentUser.username,
      text: InputValue,
    };
    if (e.code === 'Enter') {
      socket.emit('message', newMessage);
      setCurrentUser({
        ...CurrentUser,
        text: '',
      });
      setInputValue('');
    }
  };

  const onSendMessageButton = () => {
    const newMessage: iMessage = {
      room: CurrentUser.room,
      username: CurrentUser.username,
      text: InputValue,
    };

    socket.emit('message', newMessage);
    setCurrentUser({
      ...CurrentUser,
      text: '',
    });
    setInputValue('');
  };

  useEffect(() => {
    if (lastMessageRef.current)
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [ListMessages]);

  useEffect(() => {
    socket.on('message', (messages) => {
      setListMessages(messages);
    });
  }, [CurrentUser]);

  useEffect(() => {
    setCurrentUser(JSON.parse(String(localStorage.getItem('@UserChat'))));
    socket.on('messages_room', (messages) => {
      setListMessages(messages);
    });
  }, []);

  return (
    <div className='ChatContainer'>
      <section className='ChatBody'>
        <div className='row'>
          <button className='btn btn_link' onClick={onExit}>
            Sair
          </button>
          <div className='welcome'>
            Olá <strong> {CurrentUser.username} </strong> - Você está na Sala
            <strong> {CurrentUser.room} </strong>
          </div>
          <hr />
          <div className='chat_content'>
            <div className='messages' id='messages'>
              {ListMessages.map((message, idx) =>
                message.username === CurrentUser.username ? (
                  <div
                    className='new_message my_msg'
                    key={idx}
                    ref={lastMessageRef}
                  >
                    <label className='message_label'>
                      <strong>Você</strong>
                      <span>
                        {message.text}
                        <time>
                          {dayjs(message.created_at).format('DD-MM-YYYY HH:mm')}
                        </time>
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className='new_message' key={idx} ref={lastMessageRef}>
                    <label className='message_label'>
                      <strong>{message.username}</strong>
                      <span>
                        {message.text}
                        <time>
                          {dayjs(message.created_at).format('DD-MM-YYYY HH:mm')}
                        </time>
                      </span>
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className='inputRow'>
            <input
              type='text'
              value={InputValue}
              onChange={onChangeText}
              onKeyDown={onSendMessage}
              className='message_send'
              placeholder='Digite sua mensagem...'
            />
            <span
              className='material-symbols-rounded'
              onClick={onSendMessageButton}
            >
              send
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
