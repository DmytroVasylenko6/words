import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../store/auth/authSlice';

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuthenticated);

  return useMemo(() => isAuth, [isAuth]);
};
