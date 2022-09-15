import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { MainPage, MonthlyThemePage, GalleryListPage, SignUpPage, NotFoundPage } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="monthlyTheme/" element={<MonthlyThemePage />}></Route>
          <Route path="/gallery" element={<GalleryListPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
