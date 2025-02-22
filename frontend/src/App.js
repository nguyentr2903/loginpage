import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";
import CursorFollower from "./components/cursorFollower";
function App() {
  return (
    //Router container of the entire application 
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <CursorFollower />
      </div>
     
    </BrowserRouter>
  );
  
}

export default App;
