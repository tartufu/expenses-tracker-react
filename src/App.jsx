import "./App.css";

import { Counter } from "./features/counter/counter";

import { Link, Route } from "wouter";

const App = () => (
  <div>
    <Link href="/users/John">My Account</Link>
    <Route path="/inbox" component={Counter} />
    <Route path="/settings">Settings</Route>
    <Route path="/users/:name">
      {(params) => <div>Hello, {params.name}!</div>}
    </Route>
  </div>
);

export default App;
