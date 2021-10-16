import React from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './store';
import Router from './router';

function App() {
  return (
    <div className="App">
      <Store>
        <Router />
      </Store>
    </div>
  );
}

export default App;
