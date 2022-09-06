import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState("");
  const [loader, setLoader] = useState(false);
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem("TracerAccessToken")
  );
  const [expenseData, setExpenseData] = useState(false);

  const setIsLoggedFn = (data) => {
    setIsLogged(data);
  };

  const setUserDataFn = (data) => {
    setUserData(data);
  };

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const setAccessTokenFn = (data) => {
    setAccessToken(data);
  };

  const setExpenseDataFn = (data) => {
    setExpenseData(data);
  };

  const ContextData = {
    user: {
      isLogged: isLogged,
      setIsLogged: setIsLoggedFn,
    },
    util: {
      loader: loader,
      setLoader: setLoaderFn,
    },
    accessToken: accessToken,
    setAccessToken: setAccessTokenFn,
    expenseData: expenseData,
    setExpenseData: setExpenseDataFn,
    userData: userData,
    setUserData: setUserDataFn,
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
