import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setTransactionTypeArr } from "../features/transaction/transactionSlice";

import { getTransactionTypes } from "../utility/transaction/transaction-api";

const Preload = ({ children }) => {
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getTransactionTypes();
      console.log(response);
      dispatch(setTransactionTypeArr(response.data));
      setDataLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{dataLoaded ? children : null}</>;
};

export default Preload;

Preload.propTypes = {
  children: PropTypes.element,
};
