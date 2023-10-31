import { ReactNode } from 'react';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import ErrorBoundary from '../ErrorBoundary';

interface IProp {
  children: ReactNode;
}
const PrivateRoute = ({ children }: IProp) => {
  const auth = useAuth();
  console.log('PrivateRoute  auth:', auth);
  return auth ? (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
