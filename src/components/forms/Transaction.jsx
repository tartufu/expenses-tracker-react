const Transaction = () => {
  return (
    <div className="text-center w-6/12">
      <div className="mx-auto my-4 w-96">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this item?
        </p>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-danger w-full">Delete</button>
        <button className="btn btn-light w-full" onClick={() => alert("close")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Transaction;
