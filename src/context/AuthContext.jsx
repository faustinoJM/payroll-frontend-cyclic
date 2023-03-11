import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// interface AuthState {
//   token: string;
//   user: object;  
// }

// interface SignInCredentials {
//   email: string;
//   password: string;
// }

// interface AuthContextData {
//   user: object;
//   signIn(credentials: SignInCredentials): Promise<void>;
//   signOut(): void;
// }

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    const refresh_token = localStorage.getItem('@ConsulPayroll:refresh_token')
    const user = localStorage.getItem('@ConsulPayroll:user')

    if(refresh_token && user) {
      return {
        refresh_token,
        user: JSON.parse(user) 
      }
    }

    return {}
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { refresh_token,  user } = response.data;

    localStorage.setItem('@ConsulPayroll:refresh_token', refresh_token)
    localStorage.setItem('@ConsulPayroll:user', JSON.stringify(user))
    
    setData({ refresh_token, user })
  }, [])

  const signOut = useCallback(() => {
    // navigate("/login")
    localStorage.removeItem('@ConsulPayroll:refresh_token')
    localStorage.removeItem('@ConsulPayroll:user')
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}