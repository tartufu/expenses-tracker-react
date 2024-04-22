import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar";
import StatBox from "../components/StatBox";
import Button from "../components/Button";

import { addUserIncome, getUserIncome } from "../utility/expenses/expenses-api";

const UserDashBoard = ({ params }) => {
  const { user } = params;

  console.log(user);

  const [totalIncome, setTotalIncome] = useState(0);

  // const [amount, setAmount] = useState(0);
  const amount = 6750;

  const accessToken = useSelector((state) => state.user.token.access);

  const submitBtnHandler = () => {
    alert("PING!");
  };

  const submitIncomeBtnHandler = () => {
    addUserIncome(params.user, amount, accessToken);
  };

  useEffect(() => {
    (async () => {
      const getTotalIncome = await getUserIncome(user, accessToken);
      setTotalIncome(getTotalIncome.data.amount);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-start space-x-8">
        <Sidebar />
        <div className="flex flex-col items-start">
          <div className="mt-4">
            <Button
              text="Add Transaction"
              styling=""
              submitBtnHandler={submitBtnHandler}
            />
          </div>
          <div className="flex space-x-8 mt-4">
            <StatBox
              title="Income"
              value={totalIncome}
              textColor="text-green-500"
            />
            <StatBox title="Expenses" value={3434} textColor="text-red-500" />
            <StatBox title="Balance" value={1066} />
          </div>
        </div>

        <Button
          text="Add Expense"
          styling=""
          submitBtnHandler={submitIncomeBtnHandler}
        />
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
