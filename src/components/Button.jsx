import PropTypes from "prop-types";

import PlusSymbol from "../assets/plusSymbol.svg?react";

const Button = ({ buttonText, clickBtnHandler }) => {
  return (
    <>
      <button
        className="btn btn-wide btn-success text-white mr-4"
        onClick={clickBtnHandler}
      >
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
};
