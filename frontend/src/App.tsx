import React, { lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
const MainPage = lazy(() => import("./pages/MainPage"));
const MonthlyThemePage = lazy(() => import("./pages/MonthlyThemePage"));
const GalleryListPage = lazy(() => import("./pages/GalleryListPage"));
const MyNftPage = lazy(() => import("./pages/MyNftPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const VirtualGallery = lazy(() => import("./pages/VirtualGallery"));
const EditVirtualGallery = lazy(() => import("./pages/EditVirtualGallery"));

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
            <Route path="/virtual-gallery/:key" element={<VirtualGallery/>} />
            <Route
              path="/edit-virtual-gallery/:key"
              element={<EditVirtualGallery />}
            />
            <Route path="/myNft" element={<MyNftPage />}></Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
