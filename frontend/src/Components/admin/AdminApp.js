import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from './Head';
import Login from "./Login";


const App = () => {
  return (
    <>
    {/* <BrowserRouter> */}
      <Routes>
         <Route path="/" element={<Login />} /> 
        <Route path="/head/*" element={<Head />} />
        
      </Routes>
      {/* </BrowserRouter> */}
      </>
  );
};

export default App;
