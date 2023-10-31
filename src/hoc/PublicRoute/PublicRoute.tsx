import { ReactNode } from 'react';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import ErrorBoundary from '../ErrorBoundary';

interface IProp {
  children: ReactNode;
}
const PublicRoute = ({ children }: IProp) => {
  const auth = useAuth();
  return auth ? (
    <Navigate to="/" />
  ) : (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};

export default PublicRoute;
