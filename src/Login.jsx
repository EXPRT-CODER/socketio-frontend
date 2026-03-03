import React from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [name, setName] = useState("");
    const navigate = useNavigate();

    const gotoNext = async () => {

    if(name.trim() === "") {
        alert("Please enter your name!");
        return;
    }
    navigate("/home" ,  { state: { name : name } });
  };
  return (
    <div>
        <h1>Enter Your Name: </h1>
        <input 
            type='text'
            placeholder='Enter your name!'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <button onClick={gotoNext}>Next</button>
    </div>
  )
}

export default Login;
