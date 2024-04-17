import { jwtDecode } from "jwt-decode";

export const decodeJwtToken = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzMzI3ODA3LCJpYXQiOjE3MTMzMjQyMDcsImp0aSI6IjZkZDI4Y2M3NmY5ZTQ4OTFiZTk3NDA4N2M5NjZkOTBmIiwidXNlcl9pZCI6MjF9.BzCNcOUklZm8iTgekhVJLQsv1pPvcE4uMisO4cItHdM";
  const decoded = jwtDecode(token);

  console.log("DECODED", decoded);
};
