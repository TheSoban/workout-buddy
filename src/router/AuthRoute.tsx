import React from 'react';
import {Route, RouteProps, Redirect} from 'react-router-dom'
import { useAuth } from '../store/auth';

const AuthRoute: React.FC<RouteProps> = (props) => {
  const {user} = useAuth();
  return user.authenticated ? <Route {...props} /> : <Redirect to={'/signin'} />
}

export default AuthRoute;