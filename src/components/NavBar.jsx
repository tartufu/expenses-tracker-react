import { Link } from "wouter";

import { useSelector, useDispatch } from "react-redux";
import { clearJwtToken } from "../features/counter/user/userSlice";

import HomePageLogo from "../assets/logo-favicon-white.svg?react";

export default function NavBar() {
  const isUserLoggedIn = useSelector((state) => state.user.token.access);
  const dispatch = useDispatch();

  const userDashboardUrl = `/${useSelector(
    (state) => state.user.username
  )}/dashboard`;

  console.log(userDashboardUrl);

  const logoutBtnHandler = () => {
    dispatch(clearJwtToken());
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="mx-auto flex justify-between items-center">
          <div className="text-white font-bold">
            <Link to="/">
              <HomePageLogo className="mx-auto h-10 w-auto" />
              {/* <span className="text-white">Home</span> */}
            </Link>
          </div>
          <ul className="flex">
            {isUserLoggedIn && (
              <li className="mr-4">
                <Link to={userDashboardUrl}>
                  <span className="text-white">Profile</span>
                </Link>
              </li>
            )}

            <li>
              {isUserLoggedIn ? (
                <span
                  className="text-white cursor-pointer"
                  onClick={logoutBtnHandler}
                >
                  Log Out
                </span>
              ) : (
                <Link to="/sign-in">
                  <span className="text-white">Sign In</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
