import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

import { Redirect } from "wouter";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // to build as an utility function later
  const isUserLoggedIn = false;

  let shouldRedirect = isUserLoggedIn ? false : true;
  return (
    <>
      {shouldRedirect && <Redirect to="/" />}
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  );
}
