import React from 'react';
import { Navigate } from 'react-router';
import SigninForm from '../components/forms/SigninForm';
import { useAuth } from '../store/auth';

// Photo by Leon Ardho from Pexels
import GymBackground from '../assets/gym-background.jpg';
import Facebook from '../assets/fb-logo.png';
import Github from '../assets/github-logo.png';
import Google from '../assets/google-logo.png';

const SignIn: React.FC = () => {
  const {user} = useAuth()
  if(user.authenticated) return <Navigate to='/panel' replace />
  // const location = useLocation();
  // const params = new URLSearchParams(location.search)

  return (
      <article className="grid" style={{padding: 0}}>
        <div style={{padding: '1.75rem'}}>
          <hgroup>
            <h1>Logowanie</h1>
            <h2>Twórz i rejestruj swoje postępy</h2>
          </hgroup>
          <SigninForm />
          <h6 style={{textAlign: 'center'}}>lub kontynuuj z</h6>
          <div className="grid">
            <div>
              <button type="button" className="contrast">
                <img src={Google} alt="Google_Logo" style={{height: '30px'}} />
              </button>
            </div>
            <div>
              <button type="button" className="contrast">
                <img src={Facebook} alt="Facebook_Logo" style={{height: '30px'}} />
              </button>
            </div>
            <div>
              <button type="button" className="contrast">
                <img src={Github} alt="Github_Logo" style={{height: '30px'}} />
              </button>
            </div>
          </div>
        </div>
        <div style={
          {
            backgroundImage: `url(${GymBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }
          }></div>
      </article>
  )
}

export default SignIn;