import PropTypes from "prop-types";

import { getUserDetails } from "../utility/api";

import PlusSymbol from "../assets/plusSymbol.svg?react";

const Button = ({ text, accessToken }) => {
  const submitBtnHandler = async () => {
    alert("!", accessToken);
    console.log(accessToken);
    await getUserDetails(accessToken);
  };
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
  accessToken: PropTypes.string.isRequired,
};
