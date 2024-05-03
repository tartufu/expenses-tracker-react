import "./App.css";

import HomePage from "./layout/HomePage";
import SignIn from "./layout/SignIn";
import SignUp from "./layout/Signup";
import UserDashBoard from "./layout/UserDashBoard";
import ExpensesReport from "./layout/ExpensesReport";
import IncomeReport from "./layout/IncomeReport";

import { Route } from "wouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import ProtectedRoutes from "./containers/ProtectedRoutes";

const App = () => (
  <div className="min-h-screen">
    <NavBar />
    <Route path="/" component={HomePage} />
    <Route path="/sign-in" component={SignIn}></Route>
    <Route path="/sign-up" component={SignUp}></Route>

    {/* Route Auth */}
    <ProtectedRoutes>
      <Route path="/settings">Settings</Route>
      <Route path="/:user/dashboard" component={UserDashBoard} />
      <Route path="/:user/expenses-report" component={ExpensesReport} />
      <Route path="/:user/income-report" component={IncomeReport} />
    </ProtectedRoutes>

    <Footer />
  </div>
);

export default App;
