import { lazy, useEffect } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { useCurrentMutation } from './store/auth/authApi';
import { setCurrent, unsetToken } from './store/auth/authSlice';

const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [current] = useCurrentMutation();

  useEffect(() => {
    if (token) getCurrent();
  }, []);

  const getCurrent = async () => {
    try {
      const { user } = await current().unwrap();
      dispatch(setCurrent(user));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    dispatch(unsetToken());
  };

  return (
    <>
      <h1>React Router</h1>

      <Navigation logout={logout} />

      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

interface NavigationProps {
  logout: () => void;
}

const Navigation = ({ logout }: NavigationProps) => (
  <nav>
    <Link to="/signup">Sign up</Link>
    <Link to="/signin">Sign in</Link>
    <Link to="/">Home</Link>
    <button onClick={logout}>Log out</button>
  </nav>
);

export default App;
