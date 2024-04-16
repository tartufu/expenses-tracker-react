import { useState } from "react";
import { Link } from "wouter";
import { useDispatch } from "react-redux";

import { signInApiCall } from "../utility/api";
import {
  setJwtToken,
  setUserDetails,
} from "../features/counter/user/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccesfulSignIn, setIsSuccessfulSignIn] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const submitBtnHandler = async (e) => {
    e.preventDefault();

    try {
      const postData = { username, password };
      const token = await signInApiCall(postData);
      const email = token.data.email;
      setIsSuccessfulSignIn(true);

      console.log("token", token);
      //TODO: Set user auth token in redux state
      dispatch(setJwtToken(token));
      dispatch(setUserDetails({ username, email }));
    } catch (error) {
      console.log("ERROR", error);
      error.name = "";
      setHasError(true);
      setErrorMsg(error.toString());
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {isSuccesfulSignIn && <p className="text-center"> asdasdasdas </p>}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {hasError && (
            <p className="text-center text-xl font-bold leading-9 tracking-tight text-red-600">
              {errorMsg}
            </p>
          )}
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => submitBtnHandler(e)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link to="/sign-up">
                <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign Up for a new account
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
