import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Redirect } from "wouter";

const ProtectedRoutes = ({ children }) => {
  const isUserLoggedIn = useSelector((state) => state.user.token.access);

  return (
    <>
      {!isUserLoggedIn && <Redirect to="/" />}
      {children}
    </>
  );
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  children: PropTypes.array,
};
