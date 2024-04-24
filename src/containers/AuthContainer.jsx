/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { refreshTokenCall, getUserDetails } from "../utility/api";

import { setJwtToken, setUserDetails } from "../features/user/userSlice";
import { decodeJwtToken } from "../utility/helperFuncs";

import PropTypes from "prop-types";

const AuthContainer = ({ children }) => {
  const accessToken = useSelector((state) => state.user.token.access);
  const refreshToken = useSelector((state) => state.user.token.refresh);

  const dispatch = useDispatch();

  const isAccessTokenExpired = (accessToken) => {
    if (!accessToken) return;
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
    } else {
      const tokenData = decodeJwtToken(accessToken);
      const userId = tokenData.user_id;

      (async () => {
        const response = await getUserDetails(accessToken, userId);
        dispatch(setUserDetails(response.data.data));
      })();

      console.log(userId);
    }
  }, []);

  return <>{children}</>;
};

export default AuthContainer;

AuthContainer.propTypes = {
  children: PropTypes.element,
};
