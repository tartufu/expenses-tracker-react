import "./App.css";

import { Counter } from "./features/counter/counter";
import HomePage from "./layout/HomePage";
import SignIn from "./layout/SignIn";
import SignUp from "./layout/Signup";

import { Route } from "wouter";
import NavBar from "./components/NavBar";

const App = () => (
  <div>
    <NavBar />

    <Route path="/" component={HomePage} />
    <Route path="/sign-in" component={SignIn}></Route>
    <Route path="/sign-up" component={SignUp}></Route>
    <Route path="/counter" component={Counter} />
    <Route path="/settings">Settings</Route>
    <Route path="/users/:name">
      {(params) => <div>Hello, {params.name}!</div>}
    </Route>
  </div>
);

export default App;
