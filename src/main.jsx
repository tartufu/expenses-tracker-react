import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { AuthContext } from "./containers/AuthContext.jsx";
import AuthContainer from "./containers/AuthContainer.jsx";
import "./index.css";

import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContainer>
      <App />
    </AuthContainer>
  </Provider>
);
