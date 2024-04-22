import "./App.css";

import { Counter } from "./features/counter/counter";
import HomePage from "./layout/HomePage";
import SignIn from "./layout/SignIn";
import SignUp from "./layout/Signup";

import { Route } from "wouter";
import NavBar from "./components/NavBar";
import UserDashBoard from "./layout/UserDashBoard";
import Footer from "./components/Footer";

import ProtectedRoutes from "./containers/ProtectedRoutes";

const App = () => (
  <div className="min-h-screen">
    <NavBar />
    <Route path="/" component={HomePage} />
    <Route path="/sign-in" component={SignIn}></Route>
    <Route path="/sign-up" component={SignUp}></Route>
    <Route path="/counter" component={Counter} />

    {/* Route Auth */}
    <ProtectedRoutes>
      <Route path="/settings">Settings</Route>
      <Route path="/:user/dashboard" component={UserDashBoard} />
    </ProtectedRoutes>

    <Footer />
  </div>
);

export default App;
