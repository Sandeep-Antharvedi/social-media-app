import { useRef, useContext } from 'react';
import { AuthContext } from '../../context';
import { loginCall } from '../../api';
import './Login.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const loginHandler = (event) => {
    event.preventDefault();
    loginCall(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">SOCAIL</h3>
          <span className="login-desc">
            a social networking site that makes it easy for you to connect and
            share with family and friends online
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={loginHandler}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              required
              ref={emailRef}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              required
              minLength="6"
              ref={passwordRef}
            />
            <button className="login-button">
              {isFetching ? 'LOADING' : 'Log In'}
            </button>
            <span className="login-forgot">Forgot Password?</span>
            <button className="login-register-button">
              {isFetching ? 'LOADING' : 'Create a new account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
