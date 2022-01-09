import React, {useContext, createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line
import API from '../utils/axios';

export type Provider = 'github' | 'facebook' | 'google' | 'local';

export interface APIUser {
  user_id: number | null;
  provider: Provider | null;
  username: string | null;
  avatar_url: string | null;
  disabled: boolean;
  completed: boolean;
}

export interface AuthStructure extends APIUser {
  authenticated: boolean;
}

export interface APIData<T> {
  response: T,
  status: string
}

export type APIUserData = APIData<
  {
    user: APIUser
  }
>;

export type APILocalSigninData = APIData<
  {
    message: string,
    provider: string
  }
>;

const defaultUser: AuthStructure = {
  user_id: null,
  provider: null,
  username: null,
  avatar_url: null,
  disabled: false,
  completed: false,
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
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  // Auth handlers
  const signinUsingLocal = async (values: {email: string, password: string}) => {
    try {
      const res = await API.post<APILocalSigninData>("/auth/local/signin", {...values});
      const serverData = res.data;

      if(res.status === 200 && serverData.status === 'success'){
        const res = await API.get<APIUserData>("/user");
        if(res.status === 200 && res.data.status === 'success'){
          const user = res.data.response.user;
          setUser((s: AuthStructure) => ({...s, ...user, authenticated: true}));
          navigate("/panel", {replace: true});
        }
      }
    } catch(exc) {
      console.log(exc.response);
    }
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
    try {
      const res = await API.get("/auth/logout");
      if(res.status === 200) {
        setUser(() => ({...defaultUser}) as AuthStructure);
      }
    }catch(exc) {
      console.log(exc.response);
    }
  }

  useEffect(() => {
    (async function(){
      setLoading(true);
      try{
        const res = await API.get<APIUserData>('/user');
        if(res.status === 200 && res.data.status === 'success'){
          const user = res.data.response.user;
          setUser((s: AuthStructure) => ({...s, ...user, authenticated: true}));
          setLoading(false)
        }
      }catch(e){
        console.log(e);
      }
      setLoading(false);
    })();

    return () => { console.log("Auth unmount")}
  }, []);

  return {
    user,
    loading,
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
  return (<authContext.Provider value={data}>{data.loading ? <div>loading...</div> : children}</authContext.Provider>)
}
