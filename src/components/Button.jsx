import PropTypes from "prop-types";

import PlusSymbol from "../assets/plusSymbol.svg?react";

const Button = ({ text, submitBtnHandler }) => {
  return (
    <>
      <button
        className="btn btn-wide btn-success text-white"
        onClick={submitBtnHandler}
      >
        <PlusSymbol />
        {text}
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  submitBtnHandler: PropTypes.func.isRequired,
};
