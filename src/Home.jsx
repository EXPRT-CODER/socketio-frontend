import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation ,useNavigate } from 'react-router-dom';


const Home = () => {
  const [onUsers, setOnUsers] = useState(0);
  const [userNames, setUserNames] = useState([]);
  // const socketRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state?.name ;


  useEffect(() => {

    if(username === undefined) {
        navigate("/login");
        return;
    }
    const socket = io("http://localhost:5000", {
      auth: {
        username,
      },
    });

    socket.on("usersUpdate", (data) => {
      setOnUsers(data.count);
      setUserNames(data.names);
    });

    // cleanup krna jruri h
    return () => {
      socket.off("usersUpdate");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🟢 Users Online</h1>
      <h2>{onUsers}</h2>
      <h3>User Names:</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {userNames.map((name, index) => (
          <li key={index} style={{ fontSize: "20px" }}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
