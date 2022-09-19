import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import {
  MainPage,
  MonthlyThemePage,
  GalleryListPage,
  SignUpPage,
  NotFoundPage,
  ProfilePage,
} from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/monthlyTheme" element={<MonthlyThemePage />}/>
          <Route path="/gallery" element={<GalleryListPage />}/>
          <Route path="/signUp" element={<SignUpPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
