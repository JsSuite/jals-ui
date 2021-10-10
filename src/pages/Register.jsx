import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { registerUser } from "../utils/ApiClient";
import { toast } from "react-toastify";

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

const EMAIL_REGEX = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;

const Register = () => {
  const [user, setUser] = React.useState({
    username: "",
    name: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

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

  const handleRedirectLogin = () => {
    history.push("/login");
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (!user?.username || !user?.password || !user?.email || !user?.name) {
        return setUser({
          ...user,
          edited: { username: true, password: true, name: true, email: true },
        });
      }
      delete user.edited;
      await registerUser(user);
      toast.success("Register Successful. Please login");
      history.push("/login");
    } catch (ex) {
      toast.error(ex?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles?.logo}>JALS</div>
        <div className={styles?.subTitle}>Register</div>
        <div className={styles.textField}>
          <div>Username</div>
          <input
            id="username"
            data-testid="Register.Username"
            className={styles.input}
            value={user?.username}
            onChange={handleChange}
          />
          <label
            data-testid="Register.Username.Error"
            className={styles.errorMsg}>
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
            data-testid="Register.Password"
            className={styles.input}
            value={user?.password}
            onChange={handleChange}
            type="password"
          />
          <label
            data-testid="Register.Password.Error"
            className={styles.errorMsg}>
            {!user?.password && !!user?.edited?.password ? (
              "*required"
            ) : (
              <>&nbsp;</>
            )}
          </label>
        </div>
        <div className={styles.textField}>
          <div>Name</div>
          <input
            id="name"
            data-testid="Register.Name"
            className={styles.input}
            value={user?.name}
            onChange={handleChange}
          />
          <label data-testid="Register.Name.Error" className={styles.errorMsg}>
            {!user?.name && !!user?.edited?.name ? "*required" : <>&nbsp;</>}
          </label>
        </div>
        <div className={styles.textField}>
          <div>Email</div>
          <input
            id="email"
            data-testid="Register.Email"
            className={styles.input}
            value={user?.email}
            onChange={handleChange}
          />
          <label data-testid="Register.Email.Error" className={styles.errorMsg}>
            {!user?.email && !!user?.edited?.email ? (
              "*required"
            ) : !EMAIL_REGEX.test(user?.email) && !!user?.edited?.email ? (
              "Invalid email"
            ) : (
              <>&nbsp;</>
            )}
          </label>
        </div>
        <Button
          data-testid="Register.Button"
          disabled={loading}
          onClick={handleSignUp}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <div className={styles?.registerMsg}>
          Already Have An Account? Login{" "}
          <span className={styles?.link} onClick={handleRedirectLogin}>
            here
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
