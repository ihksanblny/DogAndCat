import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Header from "./components/Header"; // ✅ Import Header

export default function App() {
  return (
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </>
  );
}
