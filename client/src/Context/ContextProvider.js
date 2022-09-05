import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [loader, setLoader] = useState(false);
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem("TracerAccessToken")
  );

  const setIsLoggedFn = (data) => {
    setIsLogged(data);
  };

  const setEmailIdFn = (data) => {
    setEmailId(data);
  };

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const setAccessTokenFn = (data) => {
    setAccessToken(data);
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
    accessToken: accessToken,
    setAccessToken: setAccessTokenFn,
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
