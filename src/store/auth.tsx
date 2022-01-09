import React, {useContext, createContext, useState, useEffect} from 'react';

// eslint-disable-next-line
import API from '../utils/axios';

export type Provider = 'github' | 'facebook' | 'google' | 'local' | null;

export interface AuthStructure {
  user_id: string | null;
  provider: Provider;
  username: string | null;
  avatar_url: string | null;
  disabled: boolean;
  completed: boolean;
  authenticated: boolean;
}

const defaultUser: AuthStructure = {
  user_id: null,
  provider: null,
  username: null,
  avatar_url: null,
  disabled: null,
  completed: null,
  authenticated: false
}

export interface AuthContextData {
  user: AuthStructure;
  signinUsingLocal: (values: {email: string, password: string}) => void;
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
  const signinUsingLocal = async (values: {email: string, password: string}) => {
    try {
      const res = await API.post("/auth/local/signin", {...values});
      const serverData = res.data as {response: {message: string, provider: string}, status: string}

      if(res.status === 200 && serverData.status === 'success'){
        const res = await API.get("/user");
        console.log(res)
      }
    } catch(exc) {
      console.log(exc.response);
    }

    // setUser((s: AuthStructure) => ({...s, user_id: '123', username: values.email, authenticated: true, provider: 'local'}) as AuthStructure);
  }

  const signinUsingGithub = () => {
    window.location.href = ('https://workout-buddy.thesoban.pl/api/auth/github')
  }

  const signinUsingGoogle = () => {
    window.location.href = ('https://workout-buddy.thesoban.pl/api/auth/google')
  }

  const signinUsingFacebook = () => {
    window.location.href = ('https://workout-buddy.thesoban.pl/api/auth/facebook')
  }

  const signout = async () => {
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
