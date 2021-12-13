import React, { createContext, useContext, useState } from 'react'
import { IUser } from '../services/user/IUser'

interface IAuthProviderProps {
    children: React.ReactNode
}

interface IAuthContextProps {
  logout(): void
  user: IUser | null
  setUser(user: IUser): void
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)

  const logout = async () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    window.location.replace('/login')
  }

  return (
    <AuthContext.Provider value={{
      logout,
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
