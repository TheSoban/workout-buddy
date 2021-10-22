import React from 'react';

import Store from './store';
import Router from './router';
import ThemeWrapper from './theme';

function App() {
  return (
    <div className="App">
      <Store>
        <ThemeWrapper>
          <Router />
        </ThemeWrapper>
      </Store>
    </div>
  );
}

export default App;
