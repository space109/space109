import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import {
  MainPage,
  MonthlyThemePage,
  GalleryListPage,
  MyNftPage,
  SignUpPage,
  NotFoundPage,
  ProfilePage,
  VirtualGallery,
} from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/monthlyTheme" element={<MonthlyThemePage />} />
            <Route path="/gallery" element={<GalleryListPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/virtual-gallery" element={<VirtualGallery />} />
            <Route path="/myNft" element={<MyNftPage />}></Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
