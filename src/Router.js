import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Header from "./Header";
import CheckPage from "./pages/CheckPage";

import { ThemeContext } from "./redux/ThemeContext";
import Footer from "./Footer";
import NFTPage from "./pages/NFTPage";
// import BackgroundSVG from "./assets/BackgroundSVG";

function Router() {
  const { theme } = useContext(ThemeContext);

  const pageStyle = {
    backgroundColor: theme === "dark" ? "#18181b" : "white",
    color: theme === "dark" ? "white" : "black",
  };

  return (
    <div
      style={pageStyle}
      className="flex justify-center min-h-screen  relative background-design bg-opacity-5 backdrop-blur-[5px]"
    >
      <Toaster />

      <main className="flex flex-col p-2 max-w-7xl w-full bg-opacity-5 backdrop-blur-[45px] justify-between">
        {" "}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:address" element={<CheckPage />} />
          <Route path="/nft-page" element={<NFTPage />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default Router;
