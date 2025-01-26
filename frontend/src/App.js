import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import "./App.css";
import CursorFollower from "./components/cursorFollower";
function App() {
  return (
    //Router container of the entire application 
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <CursorFollower />
      </div>
     
    </Router>
  );
  
}

export default App;
