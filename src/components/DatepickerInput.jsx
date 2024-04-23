import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

const DatepickerInput = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <>
      <div className="sm:col-span-4 mt-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Date
        </label>
        <Datepicker
          asSingle
          value={value}
          onChange={handleValueChange}
          useRange={false}
          inputClassName="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
};

export default DatepickerInput;
