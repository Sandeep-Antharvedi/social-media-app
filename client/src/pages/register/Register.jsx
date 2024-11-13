import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const usernamRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const registrationHandler = async (event) => {
    event.preventDefault();

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      try {
        await axios.post('api/auth/register', {
          username: usernamRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    } else {
      confirmPasswordRef.current.setCustomValidity("The Passwords do't match!");
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-left">
          <h3 className="register-logo">SOCAIL</h3>
          <span className="register-desc">
            a social networking site that makes it easy for you to connect and
            share with family and friends online
          </span>
        </div>
        <div className="register-right" onSubmit={registrationHandler}>
          <form className="register-box">
            <input
              type="text"
              placeholder="Username"
              className="register-input"
              ref={usernamRef}
            />
            <input
              type="email"
              placeholder="Email"
              className="register-input"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="register-input"
              ref={passwordRef}
            />
            <input
              type="password"
              placeholder="Password Again"
              className="register-input"
              ref={confirmPasswordRef}
            />

            <button type="submit" className="register-button">
              Sign Up
            </button>
            <button className="register-login-button">
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
