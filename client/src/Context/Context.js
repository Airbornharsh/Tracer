import { createContext } from "react";

const Context = createContext({
  user: {
    isLogged: false,
    setIsLogged: () => {},
  },
  util: {
    loader: "",
    setLoader: () => {},
  },
  accessToken: "",
  setAccessToken: () => {},
  expenseData: [],
  setExpenseData: () => {},
  userData: {},
  setUserData: () => {},
});

export default Context;
