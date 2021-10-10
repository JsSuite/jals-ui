import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/ApiClient";
import { toast } from "react-toastify";
import { useStore } from "../utils/Store";
import jwtDecode from "jwt-decode";

const styles = createStyles({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: "80px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  subTitle: {
    fontSize: "30px",
    fontWeight: "600",
    color: "#333)",
  },
  textField: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    minWidth: "330px",
  },
  input: {
    padding: "12px",
  },
  errorMsg: {
    fontSize: "12px",
    color: "red",
  },
  registerMsg: {
    marginTop: "30px",
  },
  link: {
    textDecoration: "underline",
    color: "var(--primary)",
  },
});

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const isLoggedIn = useStore((store) => store?.state?.auth?.isLoggedIn);
  const setState = useStore((store) => store?.fns?.setState);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  const handleRedirectRegister = () => {
    history.push("/register");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      edited: {
        ...user?.edited,
        [e.target.id]: true,
      },
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!user?.username || !user?.password) {
        return setUser({ ...user, edited: { username: true, password: true } });
      }
      delete user.edited;

      const token = await loginUser(user);
      const decoded = jwtDecode(token);
      setState({
        auth: {
          isLoggedIn: true,
          user: decoded,
        },
      });

      toast.success("Login Successful");
      history.push("/");
    } catch (ex) {
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles?.logo}>JALS</div>
        <div className={styles?.subTitle}>Login</div>
        <div className={styles.textField}>
          <div>Username</div>
          <input
            id="username"
            data-testid="Login.Username"
            className={styles.input}
            value={user?.username}
            onChange={handleChange}
          />
          <label data-testid="Login.Username.Error" className={styles.errorMsg}>
            {!user?.username && !!user?.edited?.username ? (
              "*required"
            ) : (
              <>&nbsp;</>
            )}
          </label>
        </div>
        <div className={styles.textField}>
          <div>Password</div>
          <input
            id="password"
            data-testid="Login.Password"
            className={styles.input}
            value={user?.password}
            type="password"
            onChange={handleChange}
          />
          <label data-testid="Login.Password.Error" className={styles.errorMsg}>
            {!user?.password && !!user?.edited?.password ? (
              "*required"
            ) : (
              <>&nbsp;</>
            )}
          </label>
        </div>
        <Button
          data-testid="Login.Button"
          disabled={loading}
          onClick={handleLogin}>
          {loading ? "Loading..." : "Login"}
        </Button>
        <div className={styles?.registerMsg}>
          No Account Yet? Sign up{" "}
          <span className={styles?.link} onClick={handleRedirectRegister}>
            here
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
