import {useContext, createContext, useState, useEffect} from 'react';
import {NotificationManager} from 'react-notifications'

// eslint-disable-next-line
import API from '../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../utils/notifications';

export type TProvider = 'github' | 'facebook' | 'google' | 'local';

export type TRole = "standard" | "moderator" | "admin";

export interface APIUser {
  user_id: number | null;
  provider: TProvider | null;
  username: string | null;
  avatar_url: string | null;
  disabled: boolean;
  completed: boolean;
  role: TRole;
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
  role: "standard",
  authenticated: false
}

export interface AuthContextData {
  user: AuthStructure;
  signinUsingLocal: (values: {email: string, password: string}) => void;
  signinUsingGithub: () => void;
  signinUsingGoogle: () => void;
  signinUsingFacebook: () => void;
  signout: () => void;
  setCompleted: () => void;
}

export const authContext = createContext<AuthContextData>(null);

//TODO
// Remove simple state handling, switch to reducer approach
const useAuthState = () => {
  const [user, setUser] = useState<AuthStructure>(defaultUser);
  const [loading, setLoading] = useState(true)

  // Auth handlers
  const signinUsingLocal = async (values: {email: string, password: string}) => {
    try {
      const res = await API.post<APILocalSigninData>("/auth/local/signin", {...values});
      console.log(res)
      const serverData = res.data;
      console.log(serverData)
      if(res.status === 200 && serverData.status === 'success'){
        const res2 = await API.get<APIUserData>("/user");
        if(res2.status === 200 && res2.data.status === 'success'){
          const user = res2.data.response.user;
          setUser((s: AuthStructure) => ({...s, ...user, authenticated: true}));
          handleNotificationResponse(res);
        }
      }
    } catch(exc) {
      handleNotificationException(exc);
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
      const res = await API.get("/auth/signout");
      if(res.status === 200) {
        handleNotificationResponse(res);
        setUser(() => ({...defaultUser}) as AuthStructure);
      }
    }catch(exc) {
      handleNotificationException(exc);
    }
  }

  const setCompleted = () => setUser(s => ({...s, completed: true}))

  useEffect(() => {
    (async function(){
      setLoading(true);
      try{
        const res = await API.get<APIUserData>('/user');
        if(res.status === 200 && res.data.status === 'success'){
          const user = res.data.response.user;
          NotificationManager.info('Zalogowano ponownie');
          setUser((s: AuthStructure) => ({...s, ...user, authenticated: true}));
          setLoading(false)
        }
      }catch(e){
        NotificationManager.info('Użytkownik nie jest zalogowany');
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
    signout,
    setCompleted
  }
}

export const useAuth = () => useContext(authContext);

export const AuthProvider: React.FC = ({children}) => {
  const data = useAuthState();
  return (<authContext.Provider value={data}>{data.loading ? <div>loading...</div> : children}</authContext.Provider>)
}
