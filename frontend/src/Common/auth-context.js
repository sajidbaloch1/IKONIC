import { createContext, useContext, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
  access_token: null,
};
const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (user, access_token) => {
    dispatch({ type: "LOGIN", payload: user, access_token: access_token });
    localStorage.setItem(
      "authInfo",
      JSON.stringify({ isAuthenticated: true, user, access_token })
    );
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
