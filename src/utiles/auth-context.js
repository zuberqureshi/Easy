

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  quizValue:'',
  quiz:()=>{},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [quizValue, setQuizValue] = useState()

  function authenticate(token) {
    setAuthToken(token);
    // AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    // AsyncStorage.removeItem("token");
  }
   
   function quiz(vl){
    setQuizValue(vl)
   }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    quiz:quiz,
    quizValue:quizValue
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
