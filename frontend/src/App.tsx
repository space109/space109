import React, { lazy, useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { debounce } from "lodash";
import { NavBar } from "./components";
import ScrollToTop from "./common/ScrollToTop";
import {
  MainPage,
  MonthlyThemePage,
  GalleryListPage,
  MyNftPage,
  SignUpPage,
  NotFoundPage,
  ProfilePage,
  VirtualGallery,
  EditVirtualGallery,
  BackStage,
} from "./pages";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [animation, setAnimation] = useState("");

  const load = () => {
    setAnimation("start");
    setLoading(true);

    setTimeout(() => {
      setAnimation("end");
    }, 5000);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  };

  // 윈도우 사이즈를 저장할 스테이트
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 윈도우 사이즈를 측정하는 함수
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            element={<BackStage loading={loading} animation={animation} />}
          >
            <Route element={<NavBar windowSize={windowSize} />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/monthlyTheme" element={<MonthlyThemePage />} />
              <Route path="/gallery" element={<GalleryListPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage load={load} />} />
              <Route path="/myNft" element={<MyNftPage />}></Route>
              <Route path="/*" element={<NotFoundPage />} />
            </Route>
            <Route path="/virtual-gallery/:key" element={<VirtualGallery />} />
            <Route
              path="/edit-virtual-gallery/:key"
              element={<EditVirtualGallery />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
