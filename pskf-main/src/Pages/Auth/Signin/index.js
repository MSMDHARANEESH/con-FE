
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import styles from './styles.module.css';
import { LoginIcon } from '@heroicons/react/outline';

const Signin = () => {
  const { login, setIsSubmitting } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole]=useState('user')
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3030/user/login', { email, password});
      const user = response.data;

      if (!user) {
        console.log("User not found");
        return;
      }

      await login(user);
      console.log("User role:", user.user.role);

      // Check if user role is admin
      if (user.user.role=== 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      // Handle error, such as displaying an error message
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Login</h2>
        </div>
       
        <form
          autoComplete="off"
          onSubmit={handleSignIn}
          className={styles.signInForm}
        >
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={styles.input}
                placeholder="Password"
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Don't have an account? Sign up{' '}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <LoginIcon className="my-auto h-5 w-6" aria-hidden="true" />
                Login
              </button>
            </div>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default Signin;
