import React from 'react'
import {Link} from 'react-router-dom'

export const BasicNavbar: React.FC = () => {
  return <nav className="container">
    <ul>
      <li><strong>Workout-buddy</strong></li>
    </ul>
    <ul>
      <li style={{marginRight: "10px"}}><Link to="/signin" role="button">Logowanie</Link></li>
      <li style={{marginRight: "10px"}}><Link to="/signup" role="button" className="contrast outline">Rejestracja</Link></li>
    </ul>
  </nav>
}