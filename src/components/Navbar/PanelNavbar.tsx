import React from 'react'
import {Link} from 'react-router-dom'

export const BasicNavbar: React.FC = () => {
  return <nav>
    <ul></ul>
    <ul>
      <li><strong>Workout-buddy</strong></li>
    </ul>
    <ul>
      <li><Link to="/signin" role="button"></Link></li>
    </ul>
  </nav>
}