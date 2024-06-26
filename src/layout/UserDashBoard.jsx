import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../components/SideBar";
import StatBox from "../components/StatBox";
import Button from "../components/Button";
import Modal from "../components/Modal";
import StatBoxMobile from "../components/StatBoxMobile";

import Transaction from "../components/forms/Transaction";

import TransactionTable from "./TransactionsTable";

import { deleteUserTransaction } from "../utility/transaction/transaction-api";

import { setTransactions } from "../features/transaction/transactionSlice";

import PlusSymbol from "../assets/plusSymbol.svg?react";
import { transactionType } from "../utility/constants";

const UserDashBoard = ({ params }) => {
  const { user } = params;

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const accessToken = useSelector((state) => state.user.token.access);
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const [modalState, setModalState] = useState({
    transactionModal: false,
    deleteModal: false,
  });

  const [isEditingTransaction, setIsEditingTransaction] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [transaction, setTransaction] = useState({});

  const selectEditHandler = (id) => {
    setIsEditingTransaction(true);
    setSelectedId(id);
    toggleModal("transactionModal", true);
  };

  const selectDeleteHandler = (id) => {
    setSelectedId(id);
    setTransaction(getSelectedTransaction());
    toggleModal("deleteModal", true);
  };

  const deleteTransactionHandler = async () => {
    const { id, type } = transaction;
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
    toggleModal("deleteModal", false);
  };

  const getSelectedTransaction = () => {
    const getSelectedTransaction = allTransactions.filter(
      (transaction) => transaction.id === selectedId
    );
    return getSelectedTransaction[0] || {};
  };

  const toggleModal = (modalType, modalState, isEditingTransaction = false) => {
    setModalState((state) => {
      return {
        ...state,
        [modalType]: modalState,
      };
    });

    if (isEditingTransaction) console.log(true);
  };

  const calculateTotal = (type) => {
    let transactionArr = [...allTransactions];
    transactionArr = transactionArr.filter(
      (transaction) => transaction.type === type
    );

    let totalValue = transactionArr.reduce(
      (accumulator, income) => accumulator + income.amount,
      0
    );

    return totalValue;
  };

  useEffect(() => {
    (async () => {
      setTotalIncome(calculateTotal(transactionType.income));
      setTotalExpense(calculateTotal(transactionType.expense));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalIncome(calculateTotal(transactionType.income));
    setTotalExpense(calculateTotal(transactionType.expense));
    setTotalBalance(totalIncome - totalExpense);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalIncome, totalExpense, allTransactions]);

  useEffect(() => {
    setTransaction(getSelectedTransaction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <>
      <div className="flex items-start space-x-8">
        <Sidebar />
        <div className="flex flex-col items-start">
          <div className="mt-4">
            <Button
              buttonText="Add Transaction"
              className="btn btn-wide btn-success text-white mr-4"
              clickBtnHandler={() => {
                toggleModal("transactionModal", true);
                setIsEditingTransaction(false);
              }}
              svg={PlusSymbol}
            />
          </div>

          {isTabletOrMobile && (
            <StatBoxMobile
              totalExpense={totalExpense}
              totalIncome={totalIncome}
              totalBalance={totalBalance}
            />
          )}

          {!isTabletOrMobile && (
            <div className="flex flex-wrap space-x-8 mt-4">
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
          )}

          <div className="mt-4">
            <TransactionTable
              selectEditHandler={selectEditHandler}
              selectDeleteHandler={selectDeleteHandler}
              type={transactionType.all}
            />
          </div>

          <Modal
            open={modalState.transactionModal}
            onClose={() => toggleModal("transactionModal", false)}
          >
            <Transaction
              closeModal={() => toggleModal("transactionModal", false)}
              isEditingTransaction={isEditingTransaction}
              transaction={transaction}
              resetSelectedId={() => setSelectedId("")}
            />
          </Modal>

          <Modal
            open={modalState.deleteModal}
            onClose={() => toggleModal(!"deleteModal", false)}
          >
            <div className="text-center">
              <p className="font-bold">Delete Transanction</p>
              <p>Do you really want to delete this transaction?</p>
              <div className="flex justify-around mt-4">
                <Button
                  buttonText="Cancel"
                  clickBtnHandler={() => toggleModal("deleteModal", false)}
                  className="btn btn-sm btn-active text-white"
                />
                <Button
                  buttonText="Delete"
                  clickBtnHandler={() => deleteTransactionHandler()}
                  className="btn btn-sm btn-error text-white"
                />
              </div>
            </div>
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
