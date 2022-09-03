import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [loader, setLoader] = useState(false);

  const setIsLoggedFn = (data) => {
    setIsLogged(data);
  };

  const setEmailIdFn = (data) => {
    setEmailId(data);
  };

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const ContextData = {
    user: {
      isLogged: isLogged,
      setIsLogged: setIsLoggedFn,
      emailId: emailId,
      setEmailId: setEmailIdFn,
    },
    util: {
      loader: loader,
      setLoader: setLoaderFn,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
