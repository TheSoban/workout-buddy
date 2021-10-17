import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../store/auth';

const SignIn: React.FC = () => {
  const {user, signinUsingGithub} = useAuth()
  if(user.authenticated) return <Redirect to='panel' />
  return <div>
    <h1>Sign In</h1>
    <button onClick={() => signinUsingGithub()}>Sign in with Github</button>
  </div>
}

export default SignIn;