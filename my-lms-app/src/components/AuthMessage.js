import React, { useContext } from "react";
import { AuthContext } from "./LoginForm";
import DisplayStatus from "./DisplayStatus";

const AuthMessage = () => {
  const { authStatus } = useContext(AuthContext);

  if (!authStatus.message) return null;

  return (
    <DisplayStatus type={authStatus.type} message={authStatus.message} />
  );
};

export default AuthMessage;
