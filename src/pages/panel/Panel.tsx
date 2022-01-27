import React from 'react';
import { Navigate } from 'react-router-dom';

const Panel: React.FC = () => {
  return <Navigate to="exercises" replace />
}

export default Panel;