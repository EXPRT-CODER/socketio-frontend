import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation ,useNavigate } from 'react-router-dom';


const Home = () => {
  const [onUsers, setOnUsers] = useState(0);
  const [userNames, setUserNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state?.name ;


  useEffect(() => {

    if(username === undefined) {
        navigate("/login");
        return;
    }

    const socket = io("https://socketio-backend-inp8.onrender.com/", {
      auth: {
        username,
      },
    });

    socket.on("connect", () => {
      setLoading(false);
    });

    socket.on("disconnect", () => {
      setLoading(true);
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
      {loading ? <p>Server is waking up... wait an minute</p> : 
      <>
        <h3>Their Names:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {userNames.map((name, index) => (
            <li key={index} style={{ fontSize: "20px" }}>
              {name}
            </li>
          ))}
        </ul>
      </>
      }
    </div>
  );
};
export default Home;
