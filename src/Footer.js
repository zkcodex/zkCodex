import React, { useContext } from "react";
import { ThemeContext } from "./redux/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`mx-auto max-w-7xl p-4 border w-full rounded-md shadow-md mt-5 text-center 
  ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
    >
      <span className="flex items-center text-sm font-bold  rounded-md p-1 gap-2">
        <hr className=" border-red-600 w-full" />

        <span className="text-sm"> Optimism</span>
        <hr className=" border-red-600 w-full" />
      </span>
      <div className="flex flex-wrap justify-center gap-4 my-2 text-xs">
        <a
          href="https://www.optimism.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500  "
        >
          Website
        </a>
        <a
          href="https://discord.com/invite/optimism"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Discord
        </a>
        <a
          href="https://github.com/ethereum-optimism/optimism"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Github
        </a>
        <a
          href="https://twitter.com/optimism"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          X (Twitter)
        </a>
        <a
          href="https://www.optimism.io/apps/all"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Ecosystem
        </a>
        <a
          href="https://status.optimism.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Status
        </a>
        <a
          href="https://optimistic.etherscan.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          OP Mainnet Explorer
        </a>
        <a
          href="https://docs.optimism.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Docs
        </a>
        <a
          href="https://app.optimism.io/quests"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Quests
        </a>
        <a
          href="https://gov.optimism.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Forum
        </a>
        <a
          href="https://vote.optimism.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Delegate
        </a>
        <a
          href="https://app.optimism.io/retropgf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          RetroPGF
        </a>
        <a
          href="https://app.optimism.io/bridge/deposit"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Bridge
        </a>
        <a
          href="https://help.optimism.io/hc/en-us"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          Support
        </a>
      </div>
      <span className="text-xs">
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/zkcodex"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          zkCodex
        </a>
      </span>
    </footer>
  );
}

export default Footer;
