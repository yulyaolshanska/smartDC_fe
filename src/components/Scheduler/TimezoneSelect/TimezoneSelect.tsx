import React from 'react';
import moment from 'moment';
import 'moment-timezone';

const allZones = moment.tz.names();
allZones.unshift('clear');

interface ITimeselectProps {
    defaultTZ?: string;
    timezone: string;
    setTimezone: (newTimezone: string) => void;
}

export default function TimezoneSelect({
    defaultTZ = moment.tz.guess(),
    timezone,
    setTimezone,
}: ITimeselectProps) {
    const onChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
        setTimezone(value ? value : defaultTZ)

    return (
        <div>
            <label>Select a Timezone</label>
            <br/>
            <select
            style={{ width: 200, display: 'inline-block' }}
            value={timezone}
            onChange={onChange}
            >
            {allZones.map((c, idx) => (
                <option key={idx} value={c !== 'clear' ? c : ''}>
                {c}
                </option>
            ))}
            </select>
        </div>
  )
};
