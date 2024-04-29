import PropTypes from "prop-types";

import Input from "../Input";
import SelectInput from "../SelectInput";
import Button from "../Button";
import DatepickerInput from "../DatepickerInput";
import Toggle from "../Toggle";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { transactionTypesArr } from "../../utility/constants";

import {
  addUserExpense,
  addUserIncome,
} from "../../utility/transaction/transaction-api";

import { transactionType } from "../../utility/constants";
import { countDecimalPlaces } from "../../utility/helperFuncs";

const Transaction = ({ closeModal }) => {
  const user = useSelector((state) => state.user.username);
  const accessToken = useSelector((state) => state.user.token.access);

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

  const submitBtnHandler = (e) => {
    e.preventDefault();
    const postBody = { type, category, date, amount, notes, label, isMonthly };
    try {
      console.log(type);
      if (type === transactionType.expense)
        addUserExpense(user, postBody, accessToken);
      if (type === transactionType.income)
        addUserIncome(user, postBody, accessToken);

      resetModalState();
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
    closeModal();
  };

  useEffect(() => {
    const filteredCategoryArr = categoryTypesArr.filter(
      (category) => category.transaction_type === type.toUpperCase()
    );
    setFilterCatArr(filteredCategoryArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div>
      <div className="mx-auto my-4 w-96">
        <h3 className="text-lg font-black text-gray-800 text-center">
          Add Transaction
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
              <Button
                buttonText="Submit"
                className="btn btn-success text-white"
                clickBtnHandler={(e) => {
                  submitBtnHandler(e);
                }}
                svg={null}
              />
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
};
