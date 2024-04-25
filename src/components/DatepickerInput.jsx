import Datepicker from "react-tailwindcss-datepicker";
import PropTypes from "prop-types";

const DatepickerInput = ({ value, onChangeHandler }) => {
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
          onChange={onChangeHandler}
          useRange={false}
          inputClassName="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
};

export default DatepickerInput;

DatepickerInput.propTypes = {
  value: PropTypes.shape({
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
  onChangeHandler: PropTypes.func.isRequired,
};
