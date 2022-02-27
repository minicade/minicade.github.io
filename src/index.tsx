import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./interface/Home";
import Games from "./interface/Games";
import Play from "./interface/Play";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play/:id" element={<Play />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

if (window.localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
} else {
  document.body.classList.add("dark");
}
