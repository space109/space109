import React from 'react';
import {Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
