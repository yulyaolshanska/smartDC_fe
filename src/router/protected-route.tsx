import { Route, Navigate, useLocation } from 'react-router';
import Spinner from '@components/Loaders/Spinner';
import { Stack } from '@mui/system';
import { authApi } from 'services/AuthService';

interface ProtectedRoutesProps {
  children: any;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const isLoggedIn = sessionStorage.getItem('userStatus');
  const { data: doctor, isLoading } = authApi.useGetMeQuery({});
  const location = useLocation();
  const doctorRole = doctor?.role ? doctor?.role : '';

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoggedIn || !allowedRoles.includes(doctorRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;