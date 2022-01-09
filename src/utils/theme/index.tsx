type themeOption = 'light' | 'dark';

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('dark-theme');
  if(savedTheme) changeTheme(savedTheme as themeOption);
}

export const changeTheme = (variant: themeOption): void => {
  localStorage.setItem('data-theme', variant);
  const html = document.querySelector('html');
  html.setAttribute('data-theme', variant);
}