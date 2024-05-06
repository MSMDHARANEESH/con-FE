import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from './styles.module.css'
import validations from './validations'

const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    loggedIn, // Add loggedIn state here
    errors,
    setErrors,
    setIsSubmitting
  } = useAuth()

  const [serverError, setServerError] = useState(null); // New state to handle server errors

  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to home if already logged in
    loggedIn && navigate('/')
  }, [loggedIn, navigate]) // Add loggedIn to dependency array

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()


    try {
      // Send signup data to server
      const response = await fetch('http://localhost:3030/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Redirect to signin page after successful signup
      navigate('/signin')
    } catch (error) {
      // Handle server errors
      console.error('Error signing up:', error);
      setServerError(error.message);
    }
  }

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          <div className={styles.inputGroup}>
             {/* First Name */}
             <div>
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              <label className="sr-only">First Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
              />
            </div>

            {/* Email */}
            <div>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
              <label className="sr-only">Email</label>
              <input
                type="email"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="sr-only">Mobile Number</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.mobileNumber}
                name="mobileNumber"
                placeholder="Mobile Number"
              />
            </div>

            {/* Password */}
            <div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
              <label className="sr-only">Password</label>
              <input
                type="password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />
            </div>

            {/* Password Confirm */}
            <div>
              {errors.passwordConfirm && <span className={styles.error}>{errors.passwordConfirm}</span>}
              <label className="sr-only">Password Confirm</label>
              <input
                type="password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
              />
            </div>

            {/* Server Error */}
            {serverError && <span className={styles.error}>{serverError}</span>}

            {/* Link to Signin */}
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Already have an account? Login{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>

            {/* Signup Button */}
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria-hidden="true"
                />
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
