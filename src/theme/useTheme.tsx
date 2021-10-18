import {useEffect, useState} from 'react';

import themes, { ThemeVariant } from './themes';

const localStorageGet = (key: string) => {
  const value = window.localStorage.getItem(key);
  if(value) return JSON.parse(value);
}

const localStorageSet = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeVariant>('light');

  const changeTheme = (theme: ThemeVariant) => {
    localStorageSet('app_theme', JSON.stringify({value: theme}));
    setTheme(theme);
  }

  useEffect(() => {
    const theme = localStorageGet('app_theme');
    console.log(theme)
    if(!theme) {
      localStorageSet('app_theme', JSON.stringify({value: 'light'}));
      return;
    }
    changeTheme(theme.value);
  }, []);

  return {theme: themes[theme], changeTheme}
}
