import { Link } from "wouter";

import { useSelector, useDispatch } from "react-redux";
import { clearJwtToken } from "../features/user/userSlice";

import HomePageLogo from "../assets/logo-favicon-white.svg?react";

import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const isUserLoggedIn = useSelector((state) => state.user.token.access);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
            {isUserLoggedIn && isTabletOrMobile && (
              <>
                <li>
                  <Link to={`/${username}/income-report`}>
                    <span className="text-white cursor-pointer pr-2">
                      Income
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to={`/${username}/expenses-report`}>
                    <span className="text-white cursor-pointer pr-2">
                      Expense
                    </span>
                  </Link>
                </li>
              </>
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
