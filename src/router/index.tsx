import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Panel from '../pages/Panel';
import SignIn from '../pages/SignIn';
import AuthRoute from './AuthRoute';

const Router: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <AuthRoute path='/' exact component={() => <Panel />} />
      <Route path='/signin' exact component={() => <SignIn />} />
      <Route path="*" component={() => <div>404 not found</div>} />
    </Switch>
  </BrowserRouter>)
}

export default Router;