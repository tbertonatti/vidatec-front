import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import paths from "./routers/paths";
import HomeLayout from "./components/layouts/HomeLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import MessageNotification from "./models/message";
import ToastCustom from "./components/Toast";

const App = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageNotification>({
    type: "error",
    text: "",
  });
  const displayMessage = (m: MessageNotification) => {
    setShowMessage(false);
    setMessage(m);
    setShowMessage(true);
  };
  return (
    <Router>
      <div
        className="justify-content-around"
        style={{ display: "flex", padding: "10px" }}
      >
        <Switch>
          <Route exact path="/">
            <Redirect to={paths.home} />
          </Route>
          <Route
            path={paths.home}
            // component={HomeLayout}
            render={() => <HomeLayout displayMessage={displayMessage} />}
          />
          <Route
            path={paths.login}
            render={() => <LoginLayout displayMessage={displayMessage} />}
          />
        </Switch>
      </div>
      <ToastCustom {...{ message, showMessage, setShowMessage }} />
    </Router>
  );
};

export default App;
