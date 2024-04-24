import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import Button from "../Button";
import DatepickerInput from "../DatepickerInput";

import { useSelector } from "react-redux";

import { transactionTypesArr } from "../../utility/constants";

const Transaction = () => {
  const categoryTypesArr = useSelector((state) => state.transaction.type);

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
            <SelectInput label="Type" options={transactionTypesArr} />
            <SelectInput label="Category" options={categoryTypesArr} />
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
