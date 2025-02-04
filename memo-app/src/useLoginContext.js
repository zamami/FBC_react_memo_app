import { createContext, useContext, useState } from "react";

const LoginContext = createContext(false);

export function useLoginStatus() {
  return useContext(LoginContext);
}

export function LoginStatusProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
