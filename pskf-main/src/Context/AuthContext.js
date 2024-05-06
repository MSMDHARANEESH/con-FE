import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: ""
}
const defaultUsers = JSON.parse(localStorage.getItem("users")) || []

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultUsers)
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [errors, setErrors] = useState({})

  const login = (finalUser) => {
      setCurrentUser(finalUser)
      console.log(finalUser)
      localStorage.setItem("user", JSON.stringify(finalUser))
      setLoggedIn(true)
      console.log("loged in")
  }

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    })
    setLoggedIn(false)
  }

  useEffect(() => {
    const isEmpty = Object.values(currentUser).every(value => value);
    if (isEmpty) {
      setLoggedIn(true);
      const userData = [...users, currentUser];
      setUsers(userData);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      setLoggedIn(false);
    }
  }, []); 

  const value = {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    loggedIn,
    setErrors,
    setIsSubmitting,
    logout,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
