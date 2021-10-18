export type ThemeVariant = 'dark' | 'light';

export interface Theme {
  colors: {
    primary: string;
  };
}

export const dark: Theme = {
  colors: {
    primary: '#123123'
  }
};


export const light: Theme = {
  colors: {
    primary: '#123123'
  }
};

const themes = {dark, light};
export default themes;