import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authApi } from 'services/AuthService';
import { appointmentApi } from 'services/AppointmentService';

interface AppointmentElement {
  id: number;
  startTime: string;
  endTime: string;
  patient: {};
  remoteDoctor: { id: number };
  zoomLink: string;
}

const useDashboardComponent = () => {
  const [fetchAll, setFetchAll] = useState<boolean>(false);
  const { data: doctor } = authApi.useGetMeQuery({});
  const { t } = useTranslation();

  const {
    data: appointmentsArray,
    refetch: refetchAppointments,
    isLoading: isLoadingAppointments,
  } = appointmentApi.useGetTodayAppointmentQuery({
    doctorId: doctor.id,
    all: fetchAll ? 'all' : '',
  });

  const getItterableAppointments = useMemo(() => {
    let copyAppointments;

    if (appointmentsArray) {
      const appointments = appointmentsArray.appointments;
      copyAppointments = [...appointments];
    }

    if (!appointmentsArray) return [];

    return copyAppointments as AppointmentElement[];
  }, [appointmentsArray]);

  const sortedAppointments = useMemo(() => {
    return getItterableAppointments.sort(
      (a: AppointmentElement, b: AppointmentElement) => {
        const startTimeA = new Date(a.startTime);
        const startTimeB = new Date(b.startTime);
        return startTimeA.getTime() - startTimeB.getTime();
      }
    );
  }, [appointmentsArray, getItterableAppointments]);

  const groupedAppointments = useMemo(() => {
    return sortedAppointments?.reduce(
      (groups: { [key: string]: AppointmentElement[] }, appointment) => {
        const startTime = new Date(appointment.startTime);
        const startHour = startTime.getHours();
        const startMinutes = startTime.getMinutes();

        const endTime = new Date(appointment.endTime);
        const endHour = endTime.getHours();
        const endMinutes = endTime.getMinutes();

        const roundedStartMinutes = Math.floor(startMinutes / 30) * 30;
        const roundedEndMinutes = Math.floor(endMinutes / 30) * 30;

        const timeRange = `${startHour}:${roundedStartMinutes
          .toString()
          .padStart(2, '0')} - ${endHour}:${roundedEndMinutes
          .toString()
          .padStart(2, '0')}`;

        if (!groups[timeRange]) {
          groups[timeRange] = [];
        }
        groups[timeRange].push(appointment);
        return groups;
      },
      {}
    );
  }, [appointmentsArray, sortedAppointments]);

  return {
    doctor,
    appointmentsArray,
    isLoadingAppointments,
    groupedAppointments,
    fetchAll,
    setFetchAll,
    refetchAppointments,
    t,
  };
};

export default useDashboardComponent;
