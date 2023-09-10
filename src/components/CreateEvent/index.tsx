"use client";

import { FC, useEffect, useState } from "react";
import DateTimePicker from 'react-datetime-picker'
import { Controller, useForm, SubmitHandler } from "react-hook-form";
// TODO: create own stylings?
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

type SeizureEventInputs = {
  DateTimePicker: Date
}

interface CreateSeizureEventProps {}

const CreateSeizureEvent : FC<CreateSeizureEventProps> = ({}) => {

  const { handleSubmit, control } = useForm<SeizureEventInputs>();
  const now = new Date()

  return (
  <div className="">
    <h1 className="text-xl font-bold text-slate-900">new seizure event?</h1>
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="DateTimePicker"
        defaultValue={new Date()}
        render={({ field: { onChange, value }}) => (
          <DateTimePicker
            disableClock={true}
            // defaultValue={now}
            value={value}
            onChange={onChange}/>
        )}
      />
      <input type="submit" />
    </form>
    </div>
  );
}

export default CreateSeizureEvent;