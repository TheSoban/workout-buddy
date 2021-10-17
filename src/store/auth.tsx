import React, {useContext, createContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router';

export interface AuthStructure {
  user_id: string;
  authenticated: boolean;
}

export interface AuthContextData {
  user: AuthStructure;
  signin: () => void;
  signinUsingGithub: () => void;
  signout: () => void;
}

export const authContext = createContext<AuthContextData>(null);

//TODO
// Remove simple state handling, switch to reducer approach
const useAuthState = () => {
  const [user, setUser] = useState<AuthStructure>({user_id: '', authenticated: false});

  // Auth handlers
  const signin = () => {
    setUser(s => ({...s, user_id: '123', authenticated: true}));
  }

  const signinUsingGithub = () => {
    window.location.href = ('https://workout-buddy-api.thesoban.pl/auth/github')
  }

  const signout = () => {
    setUser(s => ({...s, user_id: '', authenticated: false}));
  }

  useEffect(() => {
    console.log("Auth mount")

    return () => { console.log("Auth unmount")}
  }, []);

  return {
    user,
    signin,
    signinUsingGithub,
    signout
  }
}

export const useAuth = () => useContext(authContext);

export const AuthProvider: React.FC = ({children}) => {
  const data = useAuthState();
  return (<authContext.Provider value={data}>{children}</authContext.Provider>)
}