import { createContext } from "react";

const Context = createContext({
  user: {
    isLogged: false,
    setIsLogged: () => {},
    emailId: "",
    setEmailId: () => {},
  },
  util: {
    loader: "",
    setLoader: () => {},
  },
  accessToken: "",
  setAccessToken: () => {},
});

export default Context;
