import { IPatient } from "@components/general/type";
import { useTranslation } from "react-i18next";

export const getLastAppointment = (patient:IPatient,show:boolean):string => {
    const { t } = useTranslation();

    const lastAppointment = patient?.notes[0]?.note;

    if (lastAppointment) {
      return show
        ? lastAppointment
        : `${lastAppointment?.substring(0, 250)}...`;
    }
    return t('Appointments.noAppointmentsYet')
}