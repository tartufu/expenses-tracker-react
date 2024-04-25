import PropTypes from "prop-types";

const Button = ({ buttonText, clickBtnHandler, className, svg: Svg }) => {
  return (
    <>
      <button className={className} onClick={clickBtnHandler}>
        {Svg && <Svg />}
        {buttonText}
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  clickBtnHandler: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  svg: PropTypes.PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(["svg", null]),
  ]),
};
