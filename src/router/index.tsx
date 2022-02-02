import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Basic404 from '../pages/Basic404';
import Panel404 from '../pages/panel/Panel404';
import Panel from '../pages/panel/Panel';

import {PanelLayout} from '../components/Layout';

import { useAuth } from '../store/auth';
import { BasicLayout } from '../components/Layout';
import Profile from '../pages/panel/Profile';
import Disabled from '../pages/panel/Disabled';
import Exercises from '../pages/panel/Exercises';
import ExerciseSearch from '../pages/panel/ExerciseSearch';
import ExerciseDetails from '../pages/panel/ExerciseDetails';
import Moderator from '../pages/panel/moderator/Moderator';
import ModeratorExercises from '../pages/panel/moderator/ModeratorExercises';
import ModeratorCategories from '../pages/panel/moderator/ModeratorCategories';
import ModeratorMuscles from '../pages/panel/moderator/ModeratorMuscles';
import ModeratorEquipment from '../pages/panel/moderator/ModeratorEquipment';
import ModeratorEditExercise from '../pages/panel/moderator/ModeratorEditExercise';
import ModeratorNewExercise from '../pages/panel/moderator/ModeratorNewExercise';
import Admin from '../pages/panel/admin/Admin';
import BodyMass from '../pages/panel/BodyMass';
import BodyMassNew from '../pages/panel/BodyMassNew';
import BodyMassEdit from '../pages/panel/BodyMassEdit';
import Blueprints from '../pages/panel/Blueprints';
import BlueprintsNew from '../pages/panel/BlueprintsNew';
import BlueprintsEdit from '../pages/panel/BlueprintsEdit';
import Logs from '../pages/panel/Logs';
import LogsNew from '../pages/panel/LogsNew';
import LogDetails from '../pages/panel/LogDetails';
import LogEdit from '../pages/panel/LogEdit';

const RequireAuth = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user.authenticated)
    return <Navigate to="/signin" state={{ from: location }} replace />
  else if(location.pathname !== '/panel/disabled' && auth.user.disabled)
    return <Navigate to="/panel/disabled" replace />
  else if(location.pathname === '/panel/disabled' && !auth.user.disabled)
    return <Navigate to="/panel" replace />
  else if(location.pathname !== '/panel/profile' && !auth.user.completed && !auth.user.disabled)
    return <Navigate to="/panel/profile" replace />

  return children
}

const RequireModeratorRole = ({children}) => {
  const {user: {role}} = useAuth();

  if (role !== "moderator" && role !== "admin") return <Navigate to="/panel" replace />

  return children
}

const RequireAdminRole = ({children}) => {
  const {user: {role}} = useAuth();

  if (role !== "admin") return <Navigate to="/panel" replace />

  return children
}

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/"     element={<BasicLayout />}>
        <Route index             element={<Navigate to="signin" replace />} />
        <Route path="signin"     element={<SignIn />} />
        <Route path="signup"     element={<SignUp />} />
        <Route path="*"          element={<Basic404 />} />
      </Route>
      <Route path="panel" element={<RequireAuth><PanelLayout /></RequireAuth>}>
        <Route index             element={<Panel />} />
        <Route path="logs"       element={<Logs />} />
        <Route path="logs/new"       element={<LogsNew />} />
        <Route path="logs/:logId"       element={<LogDetails />} />
        <Route path="logs/edit/:logId"       element={<LogEdit />} />
        <Route path="blueprints" element={<Blueprints />} />
        <Route path="blueprints/new"  element={<BlueprintsNew />} />
        <Route path="blueprints/edit/:blueprintId"  element={<BlueprintsEdit />} />
        <Route path="body-mass"  element={<BodyMass />} />
        <Route path="body-mass/new"  element={<BodyMassNew />} />
        <Route path="body-mass/edit/:measurementId"  element={<BodyMassEdit />} />
        <Route path="exercises"  element={<Exercises />}>
          <Route index              element={<ExerciseSearch />} />  
          <Route path=":exerciseId" element={<ExerciseDetails />} />  
        </Route>
        <Route path="profile"    element={<Profile />} />
        <Route path="moderator"  element={<RequireModeratorRole><Moderator /></RequireModeratorRole>}>
          <Route index              element={<div>Wybierz element do edycji</div>} />
          <Route path="exercises"   element={<ModeratorExercises />} />
          <Route path="exercises/new"   element={<ModeratorNewExercise />} />
          <Route path="exercises/edit/:exerciseId" element={<ModeratorEditExercise />} />
          <Route path="categories"  element={<ModeratorCategories />} />
          <Route path="muscles"     element={<ModeratorMuscles />} />
          <Route path="equipment"   element={<ModeratorEquipment />} />
        </Route>
        <Route path="admin"      element={<RequireAdminRole><Admin /></RequireAdminRole>} />
        <Route path="disabled"   element={<Disabled />} />
        <Route path="*"          element={<Panel404 />} />
      </Route>
    </Routes>
  )
}

export default Router