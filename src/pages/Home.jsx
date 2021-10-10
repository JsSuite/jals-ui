import createStyles from "@style-xper/style-xper-jss";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { useStore } from "../utils/Store";

const styles = createStyles({
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "80px",
    fontWeight: "800",
    padding: "30px",
  },
});

const Home = () => {
  const currentUser = useStore((store) => store?.state?.auth?.user);
  const setState = useStore((store) => store?.fns?.setState);
  const history = useHistory();

  const handleLogout = () => {
    setState({
      auth: {
        isLoggedIn: false,
      },
    });
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <Header />
      <div className={styles?.container}>
        <p data-testid="Home.WelcomeMsg">Hello, {currentUser?.username}</p>
        <Button data-testid="Home.LogoutButton" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Home;
