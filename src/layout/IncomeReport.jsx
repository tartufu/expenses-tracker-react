import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar";
import StatBox from "../components/StatBox";

import TransactionTable from "./TransactionsTable";

import { getUserIncome } from "../utility/transaction/transaction-api";
import { transactionType } from "../utility/constants";

const IncomeReport = () => {
  const user = useSelector((state) => state.user.username);
  const accessToken = useSelector((state) => state.user.token.access);

  const [totalIncome, setTotalIncome] = useState(0);

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
          <div className="flex space-x-8 mt-4">
            <StatBox
              title="Income"
              value={totalIncome}
              textColor="text-green-500"
            />
          </div>

          <div className="mt-4">
            <TransactionTable isReport={true} type={transactionType.income} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeReport;

IncomeReport.propTypes = {
  params: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }),
};
