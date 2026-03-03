import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // auto focus
  }, []);

  const gotoNext = (e) => {
    e.preventDefault(); // prevent page reload

    if (name.trim() === "") {
      alert("Please enter your name!");
      return;
    }

    navigate("/home", { state: { name } });
  };

  return (
    <div>
      <h1>Enter Your Name:</h1>

      <form onSubmit={gotoNext}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your name!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Login;
