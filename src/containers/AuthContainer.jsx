/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { refreshTokenCall } from "../utility/api";

import { setJwtToken } from "../features/counter/user/userSlice";
import { decodeJwtToken } from "../utility/helperFuncs";

import PropTypes from "prop-types";

const AuthContainer = ({ children }) => {
  const accessToken = useSelector((state) => state.user.token.access);
  const refreshToken = useSelector((state) => state.user.token.refresh);

  const dispatch = useDispatch();

  const isAccessTokenExpired = (accessToken) => {
    const tokenData = decodeJwtToken(accessToken);

    const { exp } = tokenData;

    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;
  };

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(async () => {
      const newToken = await refreshTokenCall(accessToken, refreshToken);
      dispatch(setJwtToken({ data: newToken }));
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [accessToken]);

  useEffect(() => {
    if (isAccessTokenExpired(accessToken)) {
      async () => {
        const newToken = await refreshTokenCall(accessToken, refreshToken);
        dispatch(setJwtToken({ data: newToken }));
      };
    }
  }, []);

  return <>{children}</>;
};

export default AuthContainer;

AuthContainer.propTypes = {
  children: PropTypes.element,
};
