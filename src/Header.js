import React, { useContext } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { ThemeContext } from "./redux/ThemeContext";
import GasPrice from "./components/Other/GasPrice";
import { Link } from "react-router-dom";
import LogoSVG from "./assets/logo/opt-logo";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col">
      <div
        className={`border shadow-md rounded-md my-1 text-center p-2
      ${theme === "light" ? "border-gray-300" : "border-gray-700"}
        
        `}
      >
        <a
          href="https://zkcodex.com/"
          target="_blank"
          rel="noopener noreferrer"
          className=" font-extrabold blanka text-base sm:text-xl"
        >
          zkCodex{" "}
        </a>{" "}
        <h1 className={"text-xs sm:text-base font-bold text-center"}>
          A site made specifically for Optimism, you can visit{" "}
          <a
            href="https://zkcodex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 font-extrabold"
          >
            zkCodex{" "}
          </a>{" "}
          for all networks.
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`flex justify-between items-center  gap-5 ${
            theme === "light" ? "border-gray-300" : "border-gray-800"
          } md:flex-row flex-col`}
        >
          <Link to="/">
            <LogoSVG theme={theme} width={140} height={45} />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="/nft-page"
            className="font-semibold underline text-[9px] md:text-xs lg:text-sm underline-offset-4 decoration-slice hover:underline hover:text-indigo-500 hover:decoration-wavy "
          >
            Mint Page
          </Link>
          <GasPrice />
          {theme === "dark" ? (
            <CiLight
              className="cursor-pointer text-white"
              onClick={toggleTheme}
              size={20}
            />
          ) : (
            <CiDark
              className="cursor-pointer"
              onClick={toggleTheme}
              size={20}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
