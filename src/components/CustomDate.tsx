/* import React from 'react';

type Props = {
  value?: string;
  onClick?: () => void;
  [propName: string]: any; // TODO: Extend type of `Box`
};

 const CalendarInput = ({ value, onClick, ...props }: Props) => (
  <Box
    as="button"
    onClick={onClick}
    {...props}
    css="
      cursor: pointer;
      padding: 5px 15px;
      border: 0;
      border-radius: 4px;
      background-color: #f8485e;
      font: inherit;
      color: #fff;
    "
  >
    {value}
  </Box>
);

export default CalendarInput; */

import React, { Component } from 'react';
import { Box } from 'rebass';
import DatePicker, { registerLocale } from 'react-datepicker';
import { hu } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prefer-stateless-function
class CalendarInput extends Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <Box
        as="button"
        onClick={onClick}
        css="
      cursor: pointer;
      padding: 5px 15px;
      border: 0;
      border-radius: 4px;
      background-color: #f8485e;
      font: inherit;
      color: #fff;
    "
      >
        {value}
      </Box>
    );
  }
}

type Props = {
  date: Date;
  setDate: (d: Date) => void;
};

export const addDays = (d: Date, days: number) => {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
};

const CustomDate = ({ date, setDate }: Props) => {
  registerLocale('hu', hu);

  const dayClassName = (d: Date) => {
    const today = new Date();
    if (addDays(today, -1) < d && d <= today) return 'today';
    if (today < d && d <= addDays(today, 3)) return 'hlRed';
    if (addDays(today, 3) < d && d <= addDays(today, 6)) return 'hlOrange';
    return undefined;
  };

  return (
    <DatePicker
      selected={date}
      onChange={setDate}
      dateFormat="yyyy. MM. dd."
      dateFormatCalendar="yyyy. MMMM"
      minDate={new Date()}
      locale="hu"
      dayClassName={dayClassName}
      shouldCloseOnSelect={false}
      customInput={<CalendarInput />}
    />
  );
};

export default CustomDate;
