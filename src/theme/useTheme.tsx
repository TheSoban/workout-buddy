import {useEffect, useState} from 'react';

import themes, { ThemeVariant } from './themes';

const localStorageGet = (key: string) => {
  const value = window.localStorage.getItem(key);
  if(value) return JSON.parse(value);
}

const localStorageSet = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
}

const useTheme = () => {
  const [theme, setTheme] = useState<ThemeVariant>('light');

  const changeTheme = (theme: ThemeVariant) => {
    
  }

  useEffect(() => {

  }, []);

  

  return {}
}

export default useTheme;