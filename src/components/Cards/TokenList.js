import React from "react";
import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function TokenList({ networkData, theme }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (networkData?.Tokens?.TOKEN && networkData?.Tokens?.NFTS) {
    return null;
  }

  return (
    <React.Fragment>
      {(networkData?.Tokens?.TOKEN || networkData?.Tokens?.NFTS) && (
        <div
          className={`my-4 p-2 px-4 text-xs border rounded-md
 ${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
`}
        >
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-sm md:text-lg font-semibold  my-2">
                TOKEN & NFT
              </h3>
              <button
                onClick={toggleOpen}
                className="border p-2 rounded-full text-sm ml-5 font-bold"
              >
                {isOpen ? <FiArrowUp /> : <FiArrowDown />}
              </button>
            </div>
            <React.Fragment>
              {isOpen && (
                <div
                  className={`overflow-y-scroll scrollbar p-2 mt-1 border rounded-md
    ${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
    `}
                  style={{ maxHeight: "500px" }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 flex-col lg:grid-cols-3 mt-4 text-[10px] md:text-xs">
                    {networkData.Tokens.TOKEN?.map((token, index) => (
                      <div
                        key={index}
                        className={`border shadow-md rounded-md p-1.5
    ${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
    `}
                      >
                        <span className="flex justify-between items-center  ">
                          <p className=""> {token.name}</p>
                          <p> {token.symbol}</p>
                        </span>

                        <span>
                          {" "}
                          <p>Balance: {token.balance}</p>
                        </span>
                        {/* <span>
                        {" "}
                        <p>Worth: {token.amount}</p>
                      </span> */}
                      </div>
                    ))}

                    {networkData.Tokens.NFTS?.map((nft, index) => (
                      <div
                        key={index}
                        className={`
   border shadow-md rounded-md p-1.5
       ${
         theme === "light"
           ? "border-gray-300 "
           : "border-gray-600 text-gray-300"
       }
   `}
                      >
                        <span className="flex justify-between items-center  ">
                          <p className="gradient-text"> {nft.name}</p>
                          <p> {nft.symbol}</p>
                        </span>

                        <span>
                          {" "}
                          <p>Balance: {nft.balance}</p>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          </>
        </div>
      )}
    </React.Fragment>
  );
}

export default TokenList;
