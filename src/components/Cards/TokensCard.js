import React, { useContext } from "react";

import { ThemeContext } from "../../redux/ThemeContext";

function TokensCard({ nftUniqueCount, tokenUniqueCount }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-md shadow-lg p-4 border  ${
        theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"
      }`}
    >
      {
        <React.Fragment>
          <span className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold  ">Tokens </h2>
          </span>
          <span className="flex justify-between text-xs items-center">
            <p className="font-bold ">NFT Unique : 
            <span className="text-xs font-normal"> {nftUniqueCount} </span>
            </p>
            <p className=" font-bold  ">Token Unique : 
            <span className="text-xs font-normal"> {tokenUniqueCount} </span>
            </p>
          </span>
        </React.Fragment>
      }
    </div>
  );
}

export default TokensCard;
