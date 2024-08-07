import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TermsOfService from './components/Services/TermsOfService';
import PrivacyPolicy from './components/Services/PrivacyPolicy';
import {
  AboutUs,
  Chef,
  FindUs,
  Footer,
  Gallery,
  Header,
  SpecialMenu,
  Reserve,
} from "./container";
import { Navbar } from "./components";
import "./App.css";

const MainContent = () => (
  <>
    <Navbar />
    <Header />
    <AboutUs />
    <SpecialMenu />
    <Chef />
    <Gallery />
    <FindUs />
    <Reserve/>
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
