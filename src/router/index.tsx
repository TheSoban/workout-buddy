import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Basic404 from '../pages/Basic404';
import Panel404 from '../pages/Panel404';
import Panel from '../pages/Panel';

import PanelLayout from '../components/PanelLayout';

import { useAuth } from '../store/auth';
import { BasicLayout } from '../components/Layout';

const RequireAuth = ({children}) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user.authenticated) return <Navigate to="/signin" state={{ from: location }} replace />
  
  return children
}

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<div>TODO: Info page</div>} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Basic404 />} />
      </Route>
      <Route path="panel" element={<RequireAuth><PanelLayout /></RequireAuth>}>
        <Route index element={<Panel />} />
        <Route path="*" element={<Panel404 />} />
      </Route>
    </Routes>
  )
}

export default Router