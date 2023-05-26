import React, { useState } from 'react';
import Logo from '@components/Logo';
import { ReactComponent as DashbordIcon } from '@assets/dashbord.svg';
import { ReactComponent as SignOutIcon } from '@assets/Sign Out.svg';
import { ReactComponent as HelpIcon } from '@assets/help.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';
import { ReactComponent as AppoitmentIcon } from '@assets/appointment.svg';
import { ReactComponent as AvaliabilityIcon } from '@assets/calendar.svg';
import photo from '@assets/mockDoctorPhoto.png';
import { authApi } from 'services/AuthService';
import { doctorActions, clearPersist } from '@redux/slices/DoctorSlice';
import { Stack } from '@mui/material';
import {
  BottomDrawer,
  DoctorName,
  DoctorSpeciality,
  DrawerContainer,
  PositionContainer,
  TopDrawer,
} from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { navigationActions } from '@redux/slices/NavigationSlice';
import LogoutModal from './SignOut';
import { useTranslation } from 'react-i18next';
import { PATH } from '@router/index';
interface PositionsInterface {
  name: string;
  to: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Drawer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedPosition = useAppSelector(
    (state) => state.navigationReducer.currentPage
  );
  const currentDoctor = useAppSelector((state) => state.doctorReducer);

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const confirmLogout = () => {
    setShowModal(false);
    dispatch(clearPersist());
    dispatch(doctorActions.logout());
    navigate(`${PATH.LOGIN}`);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const getDoctorSpecialization =
    currentDoctor.specialization === 1
      ? `${t('Dashboard.anesthesiology')}`
      : `${t('Dashboard.cardiology')}`;

  return (
    <DrawerContainer>
      <TopDrawer>
        <Logo />
        {positions.map((obj) => (
          <Link to={obj.to} key={obj.name}>
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
        <PositionContainer onClick={() => setShowModal(true)}>
          <SignOutIcon />
          Sign Out
        </PositionContainer>
      </TopDrawer>
      <BottomDrawer>
        <img src={photo} width={40} />
        <Stack>
          <DoctorName>
            {t('Appointments.doctor')} {currentDoctor.lastName}
          </DoctorName>
          <DoctorSpeciality> {getDoctorSpecialization}</DoctorSpeciality>
        </Stack>
      </BottomDrawer>
      {showModal && (
        <LogoutModal
          title={t('Auth.logoutText')}
          confirmText={t('Auth.confirm')}
          cancelTest={t('Auth.cancel')}
          handleSubmitModal={confirmLogout}
          handleCancelModal={cancelLogout}
        />
      )}
    </DrawerContainer>
  );
};

export default Drawer;
