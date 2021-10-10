import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useStore } from "./utils/Store";
import jwtDecode from "jwt-decode";
import { Switch, Route, useHistory } from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { refreshToken } from "./utils/ApiClient";

function App() {
  const setState = useStore((store) => store?.fns?.setState);
  const history = useHistory();

  React.useEffect(() => {
    const login = (data) => {
      setState({
        auth: {
          isLoggedIn: true,
          user: data,
        },
      });
    };

    const logout = () => {
      setState({
        auth: {
          isLoggedIn: false,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      const currentPath = history.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        history.push("/login");
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      return logout();
    }
    const decoded = jwtDecode(token);
    const currentDate = Date.now() / 1000;

    if (decoded.exp < currentDate) {
      refreshToken().catch(() => {
        logout();
      });
    } else {
      login(decoded);
    }
  }, [history, setState]);

  return (
    <>
      <ToastContainer toastClassName="dark-toast" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </>
  );
}

export default App;
