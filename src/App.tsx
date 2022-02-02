import Store from './store';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications'

function App() {
  return (
      <BrowserRouter>
        <NotificationContainer />
        <Store>
          <Router />
        </Store>
      </BrowserRouter>
  );
}

export default App;
