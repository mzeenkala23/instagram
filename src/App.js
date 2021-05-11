
import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './components/protectedRoute';

const Dashboard = lazy(() => import('./pages/dashboard')); 
const Login = lazy(() => import('./pages/login')); 
const SignUp = lazy(() => import('./pages/signup')); 
const Profile = lazy(() => import('./pages/profile')); 
const NotFound = lazy(() => import('./pages/not-found')); 

function App() {
  const {user} = useAuth();

  return (
    <UserContext.Provider value={{user}} >
      <Router>
        <Suspense fallback={<p> Loading...</p>}>
          <Switch>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile}/>
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
