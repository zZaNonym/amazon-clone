import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './login.scss';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push('/');
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='login-bk'
          className='login__logo'
        />
      </Link>
      <div className='login__container'>
        <h1>Sign-In</h1>
        <form onSubmit={signIn}>
          <label htmlFor='email'>E-mail</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <button type='submit' className='login__singInBtn'>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={signUp} className='login__singUpBtn'>
          Create Amazon account here
        </button>
      </div>
    </div>
  );
};

export default Login;
