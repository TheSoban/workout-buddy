import React from 'react';
import { Redirect } from 'react-router';
import SigninForm from '../components/SigninForm';
import { useAuth } from '../store/auth';

const SignIn: React.FC = () => {
  const {user, signinUsingGithub} = useAuth()
  if(user.authenticated) return <Redirect to='panel' />

  return <div>
    <h1>Sign In</h1>
    <SigninForm />
  </div>
}

export default SignIn;