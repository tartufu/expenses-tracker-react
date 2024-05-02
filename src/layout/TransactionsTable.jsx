import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { formatDateDDMMYYYY } from "../utility/helperFuncs";

import Trash from "../assets/trash.svg?react";
import Edit from "../assets/edit.svg?react";

const TransactionTable = ({ selectEditHandler, selectDeleteHandler }) => {
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  return (
    <div className="overflow-x-auto bg-white rounded-md">
      <table className="table table-zebra">
        <thead className="bg-black">
          <tr className="text-white w-96">
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th className="w-96">Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions.map((transaction) => {
            const textColorStyling =
              transaction.type === "Income" ? "text-green-500" : "text-red-500";
            return (
              <tr key={transaction.id}>
                <td>{formatDateDDMMYYYY(transaction.date)}</td>
                <td className={textColorStyling}>
                  <strong>$ {parseFloat(transaction.amount).toFixed(2)}</strong>
                </td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.notes}</td>
                <td>
                  <div className="flex">
                    <span
                      className="cursor-pointer mr-2"
                      onClick={() => selectEditHandler(transaction.id)}
                    >
                      <Edit />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => selectDeleteHandler(transaction.id)}
                    >
                      <Trash />
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

TransactionTable.propTypes = {
  selectEditHandler: PropTypes.func.isRequired,
  selectDeleteHandler: PropTypes.func.isRequired,
};
