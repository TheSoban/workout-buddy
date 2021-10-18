import React, {useContext, createContext, useState, useEffect} from 'react';
import API from '../utils/axios';

export type Provider = 'github' | 'facebook' | 'google' | 'local' | null;

export interface AuthStructure {
  user_id: string | null;
  provider: Provider;
  username: string | null;
  avatar_url: string | null;
  authenticated: boolean;
}

const defaultUser: AuthStructure = {
  user_id: null,
  provider: null,
  username: null,
  avatar_url: null,
  authenticated: false
}

export interface AuthContextData {
  user: AuthStructure;
  signinUsingLocal: () => void;
  signinUsingGithub: () => void;
  signout: () => void;
}

export const authContext = createContext<AuthContextData>(null);

//TODO
// Remove simple state handling, switch to reducer approach
const useAuthState = () => {
  const [user, setUser] = useState<AuthStructure>(defaultUser);

  // Auth handlers
  const signinUsingLocal = () => {
    setUser((s: AuthStructure) => ({...s, user_id: '123', authenticated: true, provider: 'local'}) as AuthStructure);
  }

  const signinUsingGithub = () => {
    window.location.href = ('http://thesoban.pl:4321/auth/github')
  }

  const signout = () => {
    setUser((s: AuthStructure) => ({...s, user_id: null, authenticated: false}) as AuthStructure);
  }

  useEffect(() => {
    (async function(){
      try{
        const response = await API.get('/getuser');
        const data = response.data
        console.log(response)
        console.log(data)
      }catch(e){
        console.log(e);
      }
    })();

    return () => { console.log("Auth unmount")}
  }, []);

  return {
    user,
    signinUsingLocal,
    signinUsingGithub,
    signout
  }
}

export const useAuth = () => useContext(authContext);

export const AuthProvider: React.FC = ({children}) => {
  const data = useAuthState();
  return (<authContext.Provider value={data}>{children}</authContext.Provider>)
}