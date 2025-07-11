import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("chat-username");
    if (username) setUser({ username });
  }, []);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Home user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}