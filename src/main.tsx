import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { ChatProvider } from './hooks/useChat';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  </React.StrictMode>
);

