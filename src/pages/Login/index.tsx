import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iRoomUser } from '../../@types';
import { socket } from '../../services';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState<iRoomUser>({} as iRoomUser);

  const SubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('select_room', {
      username: User.username,
      room: User.room,
    });
    localStorage.setItem(
      '@UserChat',
      JSON.stringify({
        username: User.username,
        room: User.room,
      })
    );
    navigate('/chat', { replace: true });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...User,
      username: e.target.value,
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({
      ...User,
      room: e.target.value,
    });
  };

  return (
    <div className='loginContainer'>
      <form onSubmit={SubmitLogin} className='LoginForm'>
        <div className='row'>
          <label className='form_label'>Selecione a Sala</label>
          <select onChange={onChangeSelect} name='room' className='select_room'>
            <option value='-1'>Selecione a Sala</option>
            <option value='NodeJS'>NodeJS</option>
            <option value='ReactJS'>ReactJS</option>
            <option value='React Native'>React Native</option>
            <option value='JAVA'>JAVA</option>
            <option value='Elixir'>Elixir</option>
          </select>
        </div>
        <div className='row'>
          <label className='form_label'>Digite seu Usuário</label>
          <input
            type='text'
            name='userName'
            placeholder='User Name'
            id='username_input'
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <button className='btn' type='submit'>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
