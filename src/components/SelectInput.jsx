import PropTypes from "prop-types";

const SelectInput = ({ label, options }) => {
  return (
    <div className="sm:col-span-4 mt-4">
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6"
        >
          {options.map((option) => (
            <option key={option}> {option} </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
