import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { InputContainer, Option, Select } from './styles';
import { useTranslation } from 'react-i18next';

const allZones = moment.tz.names();
allZones.unshift('clear');

interface ITimeselectProps {
    defaultTZ?: string;
    timezone: string;
    setTimezone: (newTimezone: string) => void;
};

export default function TimezoneSelect({
    defaultTZ = moment.tz.guess(),
    timezone,
    setTimezone,
}: ITimeselectProps) {
    const { t } = useTranslation();

    const onChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
        setTimezone(value ? value : defaultTZ)

    return (
        <>
            <label>{t('Calendar.selectTimezone')}</label>
            <InputContainer>
                <Select
                value={timezone}
                onChange={onChange}
                >
                {allZones.map((c, idx) => (
                    <Option key={idx} value={c !== 'clear' ? c : ''}>
                    {c}
                    </Option>
                ))}
                </Select>
            </InputContainer>
        </>
  )
};
