import React from 'react';
import Logo from '@components/Logo';
import { ReactComponent as DashbordIcon } from '@assets/dashbord.svg';
import { ReactComponent as SignOutIcon } from '@assets/Sign Out.svg';
import { ReactComponent as HelpIcon } from '@assets/help.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';
import { ReactComponent as AppoitmentIcon } from '@assets/appointment.svg';
import { ReactComponent as AvaliabilityIcon } from '@assets/calendar.svg';
import photo from '@assets/doctorPicture.png';
import { authApi } from 'services/AuthService';
import { doctorActions } from '@redux/slices/DoctorSlice';
import { Stack, Typography } from '@mui/material';
import {
  BottomDrawer,
  DoctorName,
  DoctorSpeciality,
  DrawerContainer,
  PositionContainer,
  TopDrawer,
} from './styles';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { navigationActions } from '@redux/slices/NavigationSlice';
import { loginActions } from '@redux/slices/login';
interface PositionsInterface {
  name: string;
  to: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Drawer = () => {
  const dispatch = useAppDispatch();
  const selectedPosition = useAppSelector(
    (state) => state.navigationReducer.currentPage
  );
  const location = useLocation();

  const handleSelected = (position: PositionsInterface) => {
    dispatch(navigationActions.setCurrentPage(position.to));
  };

  const positions: PositionsInterface[] = React.useMemo(
    () => [
      {
        name: 'Dashbord',
        to: '/dashboard',
        icon: DashbordIcon,
      },
      { name: 'Availability', to: '/availability', icon: AvaliabilityIcon },
      { name: 'Patients', to: '/patients', icon: UserIcon },
      { name: 'Profile', to: '/edit-doctor-profile', icon: UserIcon },
      { name: 'Appointment', to: '/appointment', icon: AppoitmentIcon },
      { name: 'Help', to: '/help', icon: HelpIcon },
    ],
    []
  );

  React.useEffect(() => {
    const position = positions.find((p) => location.pathname.startsWith(p.to));
    if (position) {
      dispatch(navigationActions.setCurrentPage(position.to));
    }
  }, [location.pathname]);

  const { data: doctor, error, isLoading, refetch } = authApi.useGetMeQuery({});

  React.useEffect(() => {
    dispatch(doctorActions.getDoctor(doctor));
  }, []);

  return (
    <DrawerContainer>
      <TopDrawer>
        <Logo />
        {positions.map((obj) => (
          <Link to={obj.to}>
            <PositionContainer
              key={obj.name}
              onClick={() => handleSelected(obj)}
              selected={selectedPosition && selectedPosition == obj.to}
            >
              {obj.icon()}
              {obj.name}
            </PositionContainer>
          </Link>
        ))}
        <PositionContainer onClick={() => dispatch(doctorActions.logout())}>
          <SignOutIcon />
          Sign Out
        </PositionContainer>
      </TopDrawer>
      <BottomDrawer>
        <img src={photo} />
        <Stack>
          <DoctorName> Dr. Malikovsy</DoctorName>
          <DoctorSpeciality>Therapist</DoctorSpeciality>
        </Stack>
      </BottomDrawer>
    </DrawerContainer>
  );
};

export default Drawer;
