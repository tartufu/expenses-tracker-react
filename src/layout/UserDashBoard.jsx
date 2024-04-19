import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar";
import StatBox from "../components/StatBox";
import Button from "../components/Button";

const UserDashBoard = ({ params }) => {
  console.log(params.user);

  //   const [username, setUsername] = useState("");

  //   useEffect(() => {
  //     // alert("PING");
  //     setUsername(params.user);
  //   }, []);

  const isUserLoggedIn = useSelector((state) => state.user.token.access);

  return (
    <>
      <div className="flex items-start space-x-8">
        <Sidebar />
        <div className="flex flex-col items-start">
          <div className="mt-4">
            <Button
              text="Add Transaction"
              styling=""
              accessToken={isUserLoggedIn}
            />
          </div>
          <div className="flex space-x-8 mt-4">
            <StatBox title="Income" value={4500} textColor="text-green-500" />
            <StatBox title="Expenses" value={3434} textColor="text-red-500" />
            <StatBox title="Balance" value={1066} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;

UserDashBoard.propTypes = {
  params: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }),
};
