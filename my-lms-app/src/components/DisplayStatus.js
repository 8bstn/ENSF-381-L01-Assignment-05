import React from "react";

const DisplayStatus = ({ type, message }) => {
  const style = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid black",
    backgroundColor: type === "success" ? "lightgreen" : "lightcoral",
    color: "black",
  };

  return <div style={style}>{message}</div>;
};

export default DisplayStatus;
