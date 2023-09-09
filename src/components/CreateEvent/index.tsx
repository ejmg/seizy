"use client";

import { FC, useState } from "react";
import DateTimePicker from 'react-datetime-picker'
// TODO: create own stylings?
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface CreateEventProps {}

const CreateEvent : FC<CreateEventProps> = ({}) => {

  const [currDateTime, setCurrDateTime] = useState<Date | null>(new Date());

  return (
  <div className="">
    <h1 className="text-xl font-bold text-slate-900">new seizure event?</h1>
    <DateTimePicker
      disableClock={true}
      value={currDateTime}
      onChange={setCurrDateTime}/>
    </div>
  );
}

export default CreateEvent;