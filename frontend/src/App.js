import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import { AuthProvider, useAuth } from "./Common/auth-context";
import { Home } from "./pages/home";
import { useEffect } from "react";
function App() {
  const { state } = useAuth();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Routes>
      {!state.isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <Route path="/" element={<Home />} />
      )}
    </Routes>
  );
}
const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
export default AppWithAuthProvider;
