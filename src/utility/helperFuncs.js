import { jwtDecode } from "jwt-decode";

export const decodeJwtToken = (token) => {
  return jwtDecode(token);
};

export const countDecimalPlaces = (number) => {
  // Convert the number to a string
  const numberString = number.toString();

  // Use a regular expression to find the decimal part
  const match = numberString.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  // If there is no decimal part, return 0
  if (!match) return 0;

  // Extract the decimal part and return its length
  const decimalPart = match[1] || "";
  return decimalPart.length;
};

export const formatDateDDMMYYYY = (dateString) => {
  const date = new Date(dateString);

  // Format the date as desired (e.g., "MM/DD/YYYY hh:mm:ss")
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return formattedDate;
};
