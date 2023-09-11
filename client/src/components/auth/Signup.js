import React, { useState } from "react";
import { useSelector } from "react-redux";

import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import OTPVerify from "./OTPVerify";

function Signup(props) {
  const [action, setAction] = useState({
    openStep1: true,
    openStep2: false,
  });

  const { phoneNumber } = useSelector((state) => state.userReducer);

  const handleActions = (actions) => {
    setAction(actions);
  };

  return (
    <>
      {action.openStep1 && <SignupStep1 handleActions={handleActions} />}
      {action.openStep2 && <SignupStep2 id={props.id} />}
    </>
  );
}

export default Signup;
