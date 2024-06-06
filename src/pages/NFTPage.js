import React, { useContext, useState } from "react";
import { mintlist, updateNFTDate } from "../service/nftdata";
import { ThemeContext } from "../redux/ThemeContext";
import { MdOpenInNew } from "react-icons/md";
// import { NFTAnnon } from "../components/Announcement";

function NFTPage() {
  const { theme } = useContext(ThemeContext);
  const [selectedChain, setSelectedChain] = useState("All");

  const filteredMintList = mintlist.filter((mint) => {
    if (selectedChain === "All") {
      return true;
    }
    return mint.chain === selectedChain;
  });

  return (
    <div className="min-h-screen  flex flex-col items-center mt-5">
      {/* <NFTAnnon /> */}
      <div className="flex justify-between items-center">
        <span className="text-xs hidden sm:block text-yellow-400">
          By minting NFTs daily, you can increase Interaction, Contract, Active
          days and month.
        </span>
      </div>

      <span className="text-[11px] my-2 ">
        Last updated: {updateNFTDate || "-/-/-"}
      </span>

      <div className="max-w-full overflow-x-auto scrollbar">
        <div className="flex justify-start gap-2 my-4 w-max">
          <button
            className={`text-xs sm:text-sm font-bold py-2 px-3 rounded-md border uppercase ${
              theme === "dark" ? "border-gray-800" : "border-gray-300"
            } ${
              selectedChain === "All"
                ? "bg-indigo-500 text-white"
                : "text-indigo-500"
            }`}
            onClick={() => setSelectedChain("All")}
          >
            All
          </button>
          {mintlist
            .filter(
              (mint, index, self) =>
                index === self.findIndex((t) => t.chain === mint.chain)
            )
            .map((mint, index) => (
              <button
                onClick={() => setSelectedChain(mint.chain)}
                key={index}
                className={`text-xs sm:text-sm  font-bold py-2 px-3 rounded-md border uppercase ${
                  selectedChain === mint.chain
                    ? "bg-indigo-500 text-white "
                    : ""
                } ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}
              >
                {mint.chain}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2 w-full  ">
        {filteredMintList.map((nft, index) => (
          <div
            key={index}
            className={`bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg p-4 transform hover:scale-105 transition-transform duration-300  w-full border relative
            ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}
          >
            <div className="flex gap-2 items-center justify-between mb-2">
              <div className="flex gap-2 items-center">
                <img
                  src={require(`../assets/ico/${nft.chain}.png`)}
                  alt={nft.name}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <h2 className="text-sm sm:text-base lg:text-lg font-bold ">
                  {nft.name}
                </h2>
              </div>
              <span className="text-xs text-gray-400 uppercase font-extrabold">
                {nft.source}
              </span>
            </div>

            <span
              className={`text-[11px] sm:text-sm rounded-md my-2  ${
                nft.price === "free" ? "text-green-500" : ""
              }`}
            >
              {nft.price === "free" ? (
                <span className="text-white px-4 py-1 bg-green-500 rounded-sm">
                  FREE
                </span>
              ) : (
                <span className="text-white px-4 py-1 bg-red-500 rounded-sm">
                  {nft.price} $
                </span>
              )}
            </span>

            <a
              href={nft.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-indigo-500 w-full hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center mt-2 shadow-md text-xs sm:text-sm flex items-center justify-center gap-1"
            >
              Mint NFT <MdOpenInNew />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTPage;
