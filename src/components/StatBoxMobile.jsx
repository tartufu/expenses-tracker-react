import PropTypes from "prop-types";

const StatBoxMobile = ({ totalExpense, totalIncome, totalBalance }) => {
  return (
    <div className="flex justify-center w-screen mt-2">
      <div className="stats shadow p-4 col-span-4 w-9/12">
        <div className="stat">
          <div className="stat-title font-bold">
            Balance: <span className="stat-value pl-1"> ${totalBalance} </span>
          </div>
          <div className="stat-title font-bold">
            Expense:
            <span className="stat-value text-red-500 pl-1">
              ${Math.round((totalExpense + Number.EPSILON) * 100) / 100}
            </span>
          </div>
          <div className="stat-title font-bold">
            Income:
            <span className="stat-value text-green-500 pl-1">
              ${Math.round((totalIncome + Number.EPSILON) * 100) / 100}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatBoxMobile;

StatBoxMobile.propTypes = {
  totalExpense: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalBalance: PropTypes.number.isRequired,
};
