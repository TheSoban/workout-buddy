import React, {useContext, createContext, useState, useEffect} from 'react';
// eslint-disable-next-line
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
  signinUsingGoogle: () => void;
  signinUsingFacebook: () => void;
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
    window.location.href = ('https://workout-buddy.thesoban.pl/api/auth/github')
  }

  const signinUsingGoogle = () => {
    console.log("Google strategy")
  }

  const signinUsingFacebook = () => {
    window.location.href = ('https://workout-buddy.thesoban.pl/api/auth/google')
  }

  const signout = () => {
    setUser((s: AuthStructure) => ({...defaultUser}) as AuthStructure);
  }

  useEffect(() => {
    // Uncomment to use api info
    // (async function(){
    //   try{
    //     const response = await API.get('/getuser');
    //     console.log(response)
    //   }catch(e){
    //     console.log(e);
    //   }
    // })();

    return () => { console.log("Auth unmount")}
  }, []);

  return {
    user,
    signinUsingLocal,
    signinUsingGithub,
    signinUsingFacebook,
    signinUsingGoogle,
    signout
  }
}

export const useAuth = () => useContext(authContext);

export const AuthProvider: React.FC = ({children}) => {
  const data = useAuthState();
  return (<authContext.Provider value={data}>{children}</authContext.Provider>)
}
