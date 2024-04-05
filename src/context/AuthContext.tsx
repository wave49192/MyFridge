import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
}

type User = {
    name: string
    picture: string
}

type IAuthContext = {
  user: User | null
  isAuthenticated: boolean
  storeUserToSession: (user: User, accessToken: string) => void
  getUserFromSession: () => void
  clearUserFromSession: () => void
}

const initialValue = {
  user: null,
  isAuthenticated: false,
  storeUserToSession: () => {},
  getUserFromSession: () => {},
  clearUserFromSession: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(initialValue.user)

  const isAuthenticated = user !== null
  const navigate = useNavigate()

  const storeUserToSession = (user: User, accessToken: string) => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    window.sessionStorage.setItem("accessToken", accessToken);
  }

  const getUserFromSession = () => {
    const userFromStorage = window.sessionStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null
    setUser(user)
  }

  const clearUserFromSession = () => {
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('accessToken')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, user, storeUserToSession, getUserFromSession, clearUserFromSession}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }