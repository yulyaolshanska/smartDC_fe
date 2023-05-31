import React, { useMemo } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { doctor } from '@constants/other';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';
import { specializations } from '@constants/mockData';
import { getDoctorAvatar } from '@components/Profile/api/getPhoto';
import { AvailabilityProps } from 'services/types/doctorAvalibility.type';
import {
  DoctorItem,
  DoctorItemInfo,
  DoctorName,
  DoctorImg,
} from '@components/Appointment/BookAppointmentForm/SecondStep/styles';

interface Props {
  control: Control;
  errors: FieldErrors;
  register: (param: string) => void;
  doc: AvailabilityProps;
  selectedDoctor: string;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<string>>;
}

const DoctorItemComponent = ({
  doc,
  selectedDoctor,
  errors,
  register,
  control,
  setSelectedDoctor,
}: Props) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const [avatarLoading, setAvatarLoading] = React.useState<boolean>(false);

  const avatar = async () => {
    setAvatarLoading(true);
    const avatarStatic = await getDoctorAvatar(doc.doctor.id);
    setAvatarUrl(avatarStatic);
    setAvatarLoading(false);
  };

  React.useEffect(() => {
    avatar();
  }, []);

  const finalUrl = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER + avatarUrl;

  function getSpecializationLabel(value: number) {
    const spec = specializations.find((spec) => spec.value === value);
    return spec ? spec.label : '';
  }
  const memoizedGetSpecializationLabel = useMemo(
    () => getSpecializationLabel,
    []
  );

  const handleDoctorChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    setSelectedDoctor(value);
    onChange(value);
  };

  return (
    <label htmlFor={doc.doctor.id}>
      <DoctorItem key={doc.doctor.id}>
        <DoctorItemInfo>
          <Controller
            control={control}
            name={doctor}
            render={({ field: { onChange } }) => (
              <input
                id={doc.doctor.id}
                {...register(`${doctor}`)}
                type="radio"
                value={doc.doctor.id}
                checked={selectedDoctor == doc.doctor.id}
                onChange={(e) => handleDoctorChange(e.target.value, onChange!)}
                errors={errors}
              />
            )}
          />
          {doc.doctor.photoUrl ? (
            <DoctorImg src={finalUrl} alt={doctor} width={32} height={32} />
          ) : (
            <DoctorImg
              src={defaultDoctorPhoto}
              alt={doctor}
              width={32}
              height={32}
            />
          )}

          <DoctorName>
            {doc.doctor.firstName}, {doc.doctor.lastName}
          </DoctorName>
        </DoctorItemInfo>

        <DoctorItemInfo>
          {memoizedGetSpecializationLabel(doc.doctor.specialization)}
        </DoctorItemInfo>
        <DoctorItemInfo>
          {' '}
          {doc.doctor.city}, {doc.doctor.country}
        </DoctorItemInfo>
      </DoctorItem>
    </label>
  );
};

export default DoctorItemComponent;
