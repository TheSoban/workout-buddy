import React from 'react';
import { Navigate} from 'react-router';
import { useAuth } from '../store/auth';

import GymBackground from '../assets/gym-background.jpg';
import SignupForm from '../components/forms/SignupForm';

const SignUp: React.FC = () => {
  const {user} = useAuth()
  if(user.authenticated) return <Navigate to='/panel' replace />
  // const location = useLocation();
  // const params = new URLSearchParams(location.search)

  return (
    <article className="grid" style={{padding: 0}}>
      <div style={
        {
          backgroundImage: `url(${GymBackground})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }
        }></div>
      <div style={{padding: '1.75rem'}}>
        <hgroup>
          <h1>Rejestracja konta</h1>
          <h2>Dołącz do największej społeczności i trenuj z nami</h2>
        </hgroup>
        <SignupForm />
      </div>
    </article>
  )
}

export default SignUp;