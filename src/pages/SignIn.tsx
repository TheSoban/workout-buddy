import React from 'react';
import { Redirect, useLocation } from 'react-router';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';
import { useAuth } from '../store/auth';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignIn: React.FC = () => {
  const location = useLocation();
  const {user} = useAuth()
  if(user.authenticated) return <Redirect to='panel' />
  const params = new URLSearchParams(location.search)
  console.log(params.get("param"))
  return <Container>
    <SigninForm />
  </Container>

}

export default SignIn;