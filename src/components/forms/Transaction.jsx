import PropTypes from "prop-types";

import Input from "../Input";
import SelectInput from "../SelectInput";
import Button from "../Button";
import DatepickerInput from "../DatepickerInput";
import Toggle from "../Toggle";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { transactionTypesArr } from "../../utility/constants";

import {
  addUserExpense,
  addUserIncome,
  editUserExpense,
  editUserIncome,
} from "../../utility/transaction/transaction-api";

import { transactionType } from "../../utility/constants";
import { countDecimalPlaces } from "../../utility/helperFuncs";

import { setTransactions } from "../../features/transaction/transactionSlice";

const Transaction = ({
  closeModal,
  isEditingTransaction,
  transaction,
  resetSelectedId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const accessToken = useSelector((state) => state.user.token.access);
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  const categoryTypesArr = useSelector((state) => state.transaction.type);
  const [filterCatArr, setFilterCatArr] = useState([]);

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [label, setLabel] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  const amountChangeHandler = (e) => {
    let input = e.target.value;

    if (countDecimalPlaces(e.target.value) > 2) return;

    setAmount(input);
  };

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    const postBody = { type, category, date, amount, notes, label, isMonthly };
    let newRecord;
    try {
      console.log(type);
      if (type === transactionType.expense)
        newRecord = await addUserExpense(user, postBody, accessToken);
      if (type === transactionType.income)
        newRecord = await addUserIncome(user, postBody, accessToken);

      const newTransactionsArr = [newRecord.data, ...allTransactions];

      console.log(newTransactionsArr);

      // debugger;
      dispatch(setTransactions(newTransactionsArr));
      // console.log(newRecord.data);

      resetModalState();
    } catch (e) {
      console.log(e);
    }
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    const id = transaction.id;
    const postBody = {
      id,
      type,
      category,
      date,
      amount,
      notes,
      label,
      isMonthly,
    };

    let updatedRecord;

    try {
      console.log(type);
      if (type === transactionType.expense) {
        updatedRecord = await editUserExpense(user, postBody, accessToken);
        updatedRecord = { ...updatedRecord.data.user_expense };
      }
      if (type === transactionType.income) {
        updatedRecord = await editUserIncome(user, postBody, accessToken);
        updatedRecord = { ...updatedRecord.data.user_income };
      }

      resetModalState();

      console.log(updatedRecord);

      const updatedRecordIndex = allTransactions.findIndex(
        (transaction) => transaction.id === updatedRecord.id
      );

      console.log(updatedRecordIndex);

      const updatedTransactionsArr = [...allTransactions];
      updatedTransactionsArr[updatedRecordIndex] = updatedRecord;
      dispatch(setTransactions(updatedTransactionsArr));
    } catch (e) {
      console.log(e);
    }
  };

  const resetModalState = () => {
    setType("");
    setCategory("");
    setDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setAmount("");
    setNotes("");
    setLabel("");
    setIsMonthly(false);
    resetSelectedId();
    closeModal();
  };

  useEffect(() => {
    const filteredCategoryArr = categoryTypesArr.filter(
      (category) => category.transaction_type === type?.toUpperCase()
    );
    setFilterCatArr(filteredCategoryArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (Object.keys(transaction).length === 0) return;
    setType(transaction?.type);
    setCategory(transaction?.category);
    setDate({
      startDate: new Date(transaction?.date),
      endDate: new Date(transaction?.date),
    });
    setAmount(transaction?.amount);
    setNotes(transaction?.notes);
    setLabel(transaction?.labels);
    setIsMonthly(transaction?.is_monthly_recurring);
  }, [transaction]);

  return (
    <div>
      <div className="mx-auto my-4 w-96">
        <h3 className="text-lg font-black text-gray-800 text-center">
          {isEditingTransaction ? "Edit" : "Add "} Transaction
        </h3>
      </div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <SelectInput
              label="Type"
              options={transactionTypesArr}
              onChangeHandler={(e) => setType(e.target.value)}
              value={type}
              shouldDisable={isEditingTransaction ? true : false}
            />
            <SelectInput
              label="Category"
              options={filterCatArr}
              onChangeHandler={(e) => setCategory(e.target.value)}
              value={category}
            />
            <DatepickerInput
              value={date}
              onChangeHandler={(e) => {
                setDate(e);
              }}
            />
            <Input
              label="Amount"
              type="number"
              name="amount"
              value={amount}
              step="0.01"
              onChangeHandler={(e) => amountChangeHandler(e)}
            />
            <Input
              label="Notes"
              type="text"
              name="notes"
              value={notes}
              onChangeHandler={(e) => setNotes(e.target.value)}
            />
            <Input
              label="Label (Optional)"
              type="text"
              name="label"
              value={label}
              onChangeHandler={(e) => setLabel(e.target.value)}
            />

            <Toggle
              label="Recurring Monthly Transaction"
              checked={isMonthly}
              toggleClickHandler={() => setIsMonthly(!isMonthly)}
            />

            <div className="mt-4 flex justify-end">
              {!isEditingTransaction && (
                <Button
                  buttonText="Submit"
                  className="btn btn-success text-white"
                  clickBtnHandler={(e) => {
                    submitBtnHandler(e);
                  }}
                  svg={null}
                />
              )}

              {isEditingTransaction && (
                <Button
                  buttonText="Update"
                  className="btn btn-success text-white"
                  clickBtnHandler={(e) => {
                    editBtnHandler(e);
                  }}
                  svg={null}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transaction;

Transaction.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isEditingTransaction: PropTypes.bool.isRequired,
  resetSelectedId: PropTypes.func,
  transaction: PropTypes.shape({
    id: PropTypes.string,
    user_id_id: PropTypes.number,
    amount: PropTypes.number,
    date: PropTypes.string,
    category: PropTypes.string,
    notes: PropTypes.string,
    labels: PropTypes.string,
    is_monthly_recurring: PropTypes.bool,
    created_at: PropTypes.string,
    type: PropTypes.string,
    is_deleted: PropTypes.bool,
  }),
};
