import "./App.css";
import Appbar from "./components/Appbar";
import Board from "./components/Board";
import Signin from "./components/Signin";

import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Start from "./components/Start";

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
