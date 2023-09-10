"use client";

import { type FC } from "react";
import DateTimePicker from "react-datetime-picker";
import { Controller, useForm } from "react-hook-form";
// TODO: create own stylings?
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

interface SeizureEventInputs {
  DateTimePicker: Date
};

const CreateSeizureEvent: FC = () => {
  const { handleSubmit, control } = useForm<SeizureEventInputs>();

  return (
  <div className="">
    <h1 className="text-xl font-bold text-slate-900">new seizure event?</h1>
    <form onSubmit={handleSubmit((data) => { console.log(data) })}>
      <Controller
        control={control}
        name="DateTimePicker"
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
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
};

export default CreateSeizureEvent;
