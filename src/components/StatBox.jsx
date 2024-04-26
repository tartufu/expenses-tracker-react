import PropTypes from "prop-types";

const StatBox = ({ title, value, textColor }) => {
  return (
    <div className="stats shadow p-4 col-span-4">
      <div className="stat">
        <div className="stat-title text-center">Total {title}</div>
        <div className={`stat-value text-center ${textColor}`}>
          ${Math.round((value + Number.EPSILON) * 100) / 100}
        </div>
        <div className="stat-desc text-center">21% more than last month</div>
      </div>
    </div>
  );
};

export default StatBox;

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  textColor: PropTypes.string,
};
