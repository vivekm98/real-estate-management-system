import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Single source of truth sync
  const syncAuth = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    syncAuth(); // run on app load
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
    