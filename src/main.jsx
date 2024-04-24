import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { AuthContext } from "./containers/AuthContext.jsx";
import AuthContainer from "./containers/AuthContainer.jsx";
import "./index.css";

import store from "./app/store";
import { Provider } from "react-redux";
import Preload from "./containers/PreLoad.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContainer>
      <Preload>
        <App />
      </Preload>
    </AuthContainer>
  </Provider>
);
