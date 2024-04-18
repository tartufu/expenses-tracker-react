import PropTypes from "prop-types";

const Button = ({ text }) => {
  return <button className="btn btn-outline btn-success">{text}</button>;
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
