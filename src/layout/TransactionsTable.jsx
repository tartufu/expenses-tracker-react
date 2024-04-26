import { useSelector } from "react-redux";

import { formatDateDDMMYYYY } from "../utility/helperFuncs";

const TransactionTable = () => {
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  return (
    <div className="overflow-x-auto bg-white rounded-md">
      <table className="table table-zebra">
        {/* head */}
        <thead className="bg-black">
          <tr className="text-white w-96">
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th className="w-96">Notes</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allTransactions.map((transaction) => {
            const textColorStyling =
              transaction.type === "Income" ? "text-green-500" : "text-red-500";
            return (
              <tr key={transaction.id}>
                <td>{formatDateDDMMYYYY(transaction.date)}</td>
                <td className={textColorStyling}>
                  <strong>$ {transaction.amount.toFixed(2)}</strong>
                </td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
