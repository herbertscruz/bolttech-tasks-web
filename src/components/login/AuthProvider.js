import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserMe, login } from "../../services/api";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = React.useState(() => {
    const bolttechToken = localStorage.getItem("bolttech_token");
    return bolttechToken ? JSON.parse(bolttechToken) : null;
  });
  const [user, setUser] = React.useState(() => {
    const bolttechUser = localStorage.getItem("bolttech_user");
    return bolttechUser ? JSON.parse(bolttechUser) : null;
  });

  const handleLogin = async (data) => {
    let json = await login(data);

    if (json?.status >= 400) {
      throw new Error(process.env.REACT_APP_ERROR_0001);
    }

    localStorage.setItem("bolttech_token", JSON.stringify(json));
    setToken(json);

    json = await getUserMe(json.token);

    localStorage.setItem("bolttech_user", JSON.stringify(json));
    setUser(json);

    if (json?.status >= 400) {
      handleLogout();
      throw new Error(process.env.REACT_APP_ERROR_0001);
    }

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    localStorage.removeItem("bolttech_token");
    setToken(null);

    localStorage.removeItem("bolttech_user");
    setUser(null);
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
