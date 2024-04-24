import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const signUpApiCall = async (postBody) => {
  try {
    const response = await axios.post(`${baseUrl}/sign-up/`, postBody);
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const signInApiCall = async (postBody) => {
  try {
    const response = await axios.post(`${baseUrl}/sign-in/`, postBody);
    if (!response.data.success) throw new Error(response.data.errorMsg);
    return response.data;
  } catch (error) {
    error.name = "";
    throw new Error(error.toString());
  }
};

export const refreshTokenCall = async (accessToken, refreshToken) => {
  const postBody = {
    refresh: refreshToken,
  };

  const header = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.post(`${baseUrl}/token/refresh/`, postBody, {
      header,
    });
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const getUserDetails = async (token, userId) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${baseUrl}/get-user-details/${userId}/`,
      header
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
