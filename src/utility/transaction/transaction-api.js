import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const addUserIncome = async (user, postBody, accessToken) => {
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log(header);

  try {
    const response = await axios.post(
      `${baseUrl}/${user}/add-income`,
      postBody,
      header
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const getUserIncome = async (user, accessToken) => {
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/${user}/get-income`, header);
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const addUserExpense = async (user, postBody, accessToken) => {
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log(user, postBody, accessToken);

  try {
    const response = await axios.post(
      `${baseUrl}/${user}/add-expense`,
      postBody,
      header
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const getUserExpense = async (user, accessToken) => {
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/${user}/get-expense`, header);
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};

export const getTransactionTypes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/get-transaction-types`);
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.error;
    throw new Error(errMsg);
  }
};
