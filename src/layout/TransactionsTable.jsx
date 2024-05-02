import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { formatDateDDMMYYYY } from "../utility/helperFuncs";

import Trash from "../assets/trash.svg?react";
import Edit from "../assets/edit.svg?react";

import { deleteUserTransaction } from "../utility/transaction/transaction-api";
import { setTransactions } from "../features/transaction/transactionSlice";

import Modal from "../components/Modal";
import Button from "../components/Button";

const TransactionTable = ({ selectEditHandler }) => {
  const dispatch = useDispatch();

  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  const user = useSelector((state) => state.user.username);
  const accessToken = useSelector((state) => state.user.token.access);

  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const prepDataForModal = (id, type) => {
    setTransactionId(id);
    setTransactionType(type);
    setIsDelModalOpen(!isDelModalOpen);
  };

  const resetModalState = () => {
    setTransactionId("");
    setTransactionType("");
    setIsDelModalOpen(false);
  };

  const deleteHandler = async (id, type) => {
    const postBody = { id, type };
    const deletedRecord = await deleteUserTransaction(
      user,
      accessToken,
      postBody
    );

    let updatedTransactionsArr = [...allTransactions];
    updatedTransactionsArr = updatedTransactionsArr.filter(
      (transaction) => transaction.id !== deletedRecord.data.id
    );

    dispatch(setTransactions(updatedTransactionsArr));
    resetModalState();
  };

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
                      onClick={() =>
                        prepDataForModal(transaction.id, transaction.type)
                      }
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

      <Modal
        open={isDelModalOpen}
        onClose={() => setIsDelModalOpen(!isDelModalOpen)}
      >
        <div className="text-center">
          <p className="font-bold">Delete Transanction</p>
          <p>Do you really want to delete this transaction?</p>
          <div className="flex justify-around mt-4">
            <Button
              buttonText="Cancel"
              clickBtnHandler={resetModalState}
              className="btn btn-sm btn-active text-white"
            />
            <Button
              buttonText="Delete"
              clickBtnHandler={() =>
                deleteHandler(transactionId, transactionType)
              }
              className="btn btn-sm btn-error text-white"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionTable;

TransactionTable.propTypes = {
  selectEditHandler: PropTypes.func.isRequired,
};
