import PropTypes from "prop-types";

import PlusSymbol from "../assets/plusSymbol.svg?react";

const Button = ({ buttonText, clickBtnHandler, className }) => {
  return (
    <>
      <button className={className} onClick={clickBtnHandler}>
        <PlusSymbol />
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
};
