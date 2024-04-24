import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setTransactionTypeArr } from "../features/transaction/transactionSlice";

import { getTransactionTypes } from "../utility/transaction/transaction-api";

const Preload = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await getTransactionTypes();
      console.log(response);
      dispatch(setTransactionTypeArr(response.data));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default Preload;

Preload.propTypes = {
  children: PropTypes.element,
};
