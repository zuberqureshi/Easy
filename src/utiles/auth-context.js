

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  spinValue:'',
  sipnner:()=>{},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [spinValue, setspinValue] = useState()

  function authenticate(token) {
    setAuthToken(token);
    // AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    // AsyncStorage.removeItem("token");
  }
   
   function spinner(vl){
    setspinValue(vl)
   }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    spinner:spinner,
    spinValue:spinValue
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
