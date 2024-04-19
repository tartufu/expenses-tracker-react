import PropTypes from "prop-types";

import { getUserDetails } from "../utility/api";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
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
