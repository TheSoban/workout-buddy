import React, {useState, createContext} from 'react';

export const UserContext = createContext(null);

interface UserInterface {
  user_id: string;
  provider: string
}

const Store: React.FC = ({children}) => {
  const [user, setUser] = useState<UserInterface>({user_id: '', provider: ''}); 
  return <>
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  </>
}

export default Store;