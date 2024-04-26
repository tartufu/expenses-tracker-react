import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setTransactionTypeArr,
  setTransactions,
} from "../features/transaction/transactionSlice";

import {
  getTransactionTypes,
  getAllTransactions,
} from "../utility/transaction/transaction-api";

const Preload = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.username);
  const accessToken = useSelector((state) => state.user.token.access);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const transactionTypes = await getTransactionTypes();
      console.log(transactionTypes);
      dispatch(setTransactionTypeArr(transactionTypes.data));

      const allTransactions = await getAllTransactions(user, accessToken);
      console.log(allTransactions);
      dispatch(setTransactions(allTransactions.data));
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
