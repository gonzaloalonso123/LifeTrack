import axios from "axios";
import React, { useEffect, useState } from "react";
import Lock from '../images/lock.png';

export const Pass = ({ setPass }) => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getPass = async () => {
      const pass = await axios.get("http://localhost:12901/password");
      setPassword(pass.data);
    };
    getPass();
  }, []);

  const checkPassword = async (e) => {
    if (e.currentTarget.value === password) {
      setPass(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        gap: "2em",
        marginTop: "10em",
        backgroundColor: "#fff",
        padding: "2em",
      }}
    >
      <img src={Lock} alt="lock" style={{ width: "30px", height: "30px" }} />
      <input
        type="password"
        autoComplete="new-password"
        onChange={checkPassword}
      />
    </div>
  );
};
