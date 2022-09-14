import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import GalleryListPage from "./pages/GalleryListPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/gallery" element={<GalleryListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
