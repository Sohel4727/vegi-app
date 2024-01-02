import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import OrderHistory from "../components/OrderHistory/OrderHistory";

const RoutePages = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route exact path="/history" element={<OrderHistory/>} />
      </Routes>
      
    </>
  );
};

export default RoutePages;
