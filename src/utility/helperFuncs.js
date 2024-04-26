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
