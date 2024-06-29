import React, { useState, useEffect } from 'react';
import RegistrationModal from './RegistrationModal.jsx';
import './Modal.css';

const AuthenticationModal = ({ onClose, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionToken, setSessionToken] = useState(null); // State to store the session token
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    console.log('Sending data:', { username, password });
    fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/authentication`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(error => Promise.reject(error));
        }
      })
      .then(data => {
        setSessionToken(data.session_token);
        alert('Вы успешно вошли!');
      })
      .catch(error => {
        console.error('Error occurred while logging in: ', error);
        if (error.detail) {
          alert('Произошла ошибка входа: ' + error.detail);
        } else {
          alert('Произошла ошибка входа. Пожалуйста, попробуйте позже.');
        }
      });
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-head">Вход</h2>
        <form>
          <input
            className="modal-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Имя пользователя"
          />
          <input
            className="modal-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button className="modal-button" onClick={handleLogin}>
            Войти
          </button>
        </form>
        <p className="modal-p">
          Нет аккаунта?{' '}
          <span className="modal-span" onClick={onRegisterClick}>
            Регистрация
          </span>
        </p>
        {showRegistration && (
          <RegistrationModal
            onClose={() => setShowRegistration(false)}
            onLoginClick={() => setShowRegistration(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthenticationModal;