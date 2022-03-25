import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
const DatePicker1 = props => {
    const [date, setDate] = useState('');
    return (
        <DatePicker
            className="form-control"
            selected={date}
            onChange={date => setDate(date)}
            locale={tw}
            dateFormat="yyyy/MM/dd"
            dateFormatCalendar="yyyy年 MM月"
            isClearable
        />
    )
};

export default DatePicker1;