import createStyles from "@style-xper/style-xper-jss";
import React from "react";

const styles = createStyles({
  card: {
    padding: "45px 30px",
    borderRadius: "24px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",

    cursor: "pointer",
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
    margin: "6px",
  },
  dense: {
    padding: "18px",
  },
});

export default function Card({
  children,
  dense = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={styles.card + " " + (dense ? styles.dense : "") + className}
      {...props}>
      {children}
    </div>
  );
}
