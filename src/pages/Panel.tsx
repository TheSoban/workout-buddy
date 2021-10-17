import React from 'react';
import { useAuth } from '../store/auth';

const Panel: React.FC = () => {
  const {signout} = useAuth();
  return <div>
    <h1>You are authenticated!!!</h1>
    <button onClick={() => signout()}>Sign out</button>
  </div>
}

export default Panel;