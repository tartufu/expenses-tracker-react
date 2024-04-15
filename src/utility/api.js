import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const signUpApiCall = async (postBody) => {
  await axios
    .post(`${baseUrl}/sign-up/`, postBody)
    .then((response) => {
      // Handle successful response
      // return the data here
      console.log("Response:", response.data);
    })
    .catch((e) => {
      // Handle error
      const errMsg = e.response.data.error;
      throw new Error(errMsg);
    });
};

null;
