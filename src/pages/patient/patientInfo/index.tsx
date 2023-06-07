import PatientCardInfo from '@components/Patient/PatientInfo';
import WeeklyCalendar from '@components/WeeklyCalendar';
import ZoomComponent from '@components/Zoom';
import Notes from '@components/Notes';
import BackToDashboard from '@components/BackToDashboardLink';
import { LinkContainer } from '@components/Patient/styles';

const PatientInfo = () => {
  return (
    <>
      <LinkContainer>
        <BackToDashboard />
      </LinkContainer>
      <ZoomComponent />
      <PatientCardInfo />
      <WeeklyCalendar />
      <Notes />
    </>
  );
};

export default PatientInfo;
