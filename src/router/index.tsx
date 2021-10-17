import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Panel from '../pages/Panel';
import SignIn from '../pages/SignIn';
import AuthRoute from './AuthRoute';

const Router: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={() => <div>Home</div>} />
      <Route path='/signin' exact component={() => <SignIn />} />
      <AuthRoute path='/panel' exact component={() => <Panel />} />
    </Switch>
  </BrowserRouter>)
}

export default Router;