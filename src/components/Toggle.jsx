import PropTypes from "prop-types";

const Toggle = ({ label, checked, toggleClickHandler }) => {
  return (
    <>
      <div className="sm:col-span4 mt-4">
        <label className="label cursor-pointer">
          <span className="label-text block text-sm font-medium leading-6 text-gray-900">
            {label}
          </span>
          <input
            type="checkbox"
            className="toggle"
            checked={checked}
            onChange={toggleClickHandler}
          />
        </label>
      </div>
    </>
  );
};

export default Toggle;

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleClickHandler: PropTypes.func.isRequired,
};
