import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Server from "./components/ServerAll/server";
import CreateServer from "./components/ServerCreate";
import UpdateServer from "./components/ServerUpdate";
import CreateChannel from "./components/CreateChannel"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/servers'>
            <Server/>
          </Route>
          <Route path='/servercreate'>
            <CreateServer/>
          </Route>
          <Route path ='/channelcreate'>
            <CreateChannel/>
          </Route>
          <Route path='/update'>
            <UpdateServer/>
          </Route>
          <Route path="/">
            <LoginFormPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
