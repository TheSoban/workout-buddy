import Store from './store';
import Router from './router';
import ThemeWrapper from './theme';
import AppContainer from './styled/AppContainer';

function App() {
  return (
    <ThemeWrapper>
      <AppContainer>
        <Store>
          <Router />
        </Store>
      </AppContainer>
    </ThemeWrapper>
  );
}

export default App;
