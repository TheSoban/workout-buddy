import Store from './store';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Store>
          <Router />
        </Store>
      </BrowserRouter>
  );
}

export default App;
