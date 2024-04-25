import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import Button from "../Button";
import DatepickerInput from "../DatepickerInput";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { transactionTypesArr } from "../../utility/constants";

const Transaction = () => {
  const categoryTypesArr = useSelector((state) => state.transaction.type);
  const [type, setType] = useState("");
  const [filterCatArr, setFilterCatArr] = useState([]);

  const transactionTypeSelectHandler = (e) => {
    alert(e.target.value);
    setType(e.target.value);
  };

  useEffect(() => {
    const filteredCategoryArr = categoryTypesArr.filter(
      (category) => category.transaction_type === type.toUpperCase()
    );
    setFilterCatArr(filteredCategoryArr);
  }, [type]);

  const categoryTypeSelectHandler = (e) => alert(e.target.value);

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
              onChangeHandler={(e) => transactionTypeSelectHandler(e)}
              value={type}
            />
            <SelectInput
              label="Category"
              options={filterCatArr}
              onChangeHandler={(e) => categoryTypeSelectHandler(e)}
            />
            <DatepickerInput />
            <TextInput label="Amount" />
            <TextInput label="Notes" />
            <TextInput label="Label" />
            <div className="mt-4 flex justify-end">
              <Button
                buttonText="Submit"
                className="btn btn-success text-white"
                clickBtnHandler={(e) => {
                  e.preventDefault();
                  alert("PING");
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
