import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar";
import StatBox from "../components/StatBox";
import Button from "../components/Button";
import Modal from "../components/Modal";

import Transaction from "../components/forms/Transaction";

import { getUserIncome } from "../utility/expenses/expenses-api";

const UserDashBoard = ({ params }) => {
  const { user } = params;

  console.log(user);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(3455);
  const [totalBalance, setTotalBalance] = useState(3455);

  const [open, setOpen] = useState(false);

  // const [amount, setAmount] = useState(0);

  const accessToken = useSelector((state) => state.user.token.access);

  useEffect(() => {
    (async () => {
      const getTotalIncome = await getUserIncome(user, accessToken);
      setTotalIncome(getTotalIncome.data.amount);
    })();

    // add in call later to get totalExpenses

    setTotalExpense(5623);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  return (
    <>
      <div className="flex items-start space-x-8">
        <Sidebar />
        <div className="flex flex-col items-start">
          <div className="mt-4">
            <Button
              buttonText="Add Income"
              styling=""
              clickBtnHandler={() => {
                setOpen(!open);
              }}
            />

            <Button
              buttonText="Add Expense"
              styling=""
              clickBtnHandler={() => {
                setOpen(!open);
              }}
            />
          </div>

          <div className="flex space-x-8 mt-4">
            <StatBox
              title="Income"
              value={totalIncome}
              textColor="text-green-500"
            />
            <StatBox
              title="Expenses"
              value={totalExpense}
              textColor="text-red-500"
            />
            <StatBox title="Balance" value={totalBalance} />
          </div>

          <Modal open={open} onClose={() => setOpen(false)}>
            <Transaction />
          </Modal>
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
