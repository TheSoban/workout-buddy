import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/auth'

export const PanelNavbar: React.FC = () => {
  const {signout, user} = useAuth();

  return <nav className="container">
    <ul>
      <li><strong>Workout-buddy</strong></li>
    </ul>
    <ul>
      {
        user.disabled
          ? null
          : !user.completed
            ? <li><Link to="/panel/profile">Profil</Link></li>
            : <>
                <li><Link to="/panel/logs">Rejestry</Link></li>
                <li><Link to="/panel/blueprints">Schematy</Link></li>
                <li><Link to="/panel/body-mass">Skład ciała</Link></li>
                <li><Link to="/panel/exercises">Ćwiczenia</Link></li>
                <li><Link to="/panel/profile">Profil</Link></li>
                {
                  user.role === "moderator" || user.role === "admin"
                    ? <li><Link to="/panel/moderator">Moderator</Link></li> : null
                }
                {
                  user.role === "admin"
                    ? <li><Link to="/panel/admin">Admin</Link></li> : null
                }
              </>
      }
    </ul>
    <ul>
      <li><button onClick={() => signout()}>Wyloguj się</button></li>
    </ul>
  </nav>
}