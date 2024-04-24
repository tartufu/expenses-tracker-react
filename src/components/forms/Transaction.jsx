import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import Button from "../Button";
import DatepickerInput from "../DatepickerInput";

const Transaction = () => {
  const transactionTypeArr = ["Income", "Expenses"];
  const expensesTypeArr = ["One", "Two", "Three"];

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
            <SelectInput label="Type" options={transactionTypeArr} />
            <SelectInput label="Category" options={expensesTypeArr} />
            <DatepickerInput />
            <TextInput label="Amount" />
            <TextInput label="Notes" />
            <TextInput label="Label" />
            <div className="mt-4 flex justify-end">
              <Button
                buttonText="Submit"
                className="btn btn-success text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
