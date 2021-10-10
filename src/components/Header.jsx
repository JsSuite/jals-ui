import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { Link } from "react-router-dom";

const styles = createStyles({
  header: {
    padding: "10px",
    paddingLeft: "30px",
    backgroundColor: "#fff",

    boxShadow: "0 25px 50px -10px rgb(100 44 0 / 7%)",
    position: "sticky",
    top: "0px",
    display: "flex",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  buttonSlot: {
    position: "absolute",
    top: "24px",
    right: "8px",
  },
});

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.logo}>JALS</p>
      </Link>
    </header>
  );
}
