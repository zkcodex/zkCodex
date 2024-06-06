import React, { useContext } from "react";

import { ThemeContext } from "../../redux/ThemeContext";
import { FaEthereum } from "react-icons/fa";

function BridgeCard({ count, last7Days, volumeETH, volumeUSD }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`rounded-md shadow-lg p-4 border relative  ${
        theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"
      }`}
    >
      {
        <React.Fragment>
          <span className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold">Bridge Deposit V.</h2>
            <div className="flex gap-2 text-xs items-center">
              <span
                className={`  ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <div className="flex gap-2 text-xs items-center">
                  {last7Days && (
                    <React.Fragment>
                      <div
                        className={
                          "text-xs font-bold " +
                          (!last7Days ? "text-red-500 " : "text-green-500")
                        }
                      >
                        +${Math.round(last7Days)}
                      </div>
                    </React.Fragment>
                  )}
                  <span className="text-[10px] text-gray-500 font-bold">
                    7d
                  </span>
                </div>
              </span>
            </div>
          </span>

          <span className="flex justify-between">
            <p className="text-xs">$ {Number(volumeUSD).toFixed(2)}</p>
            <p className=" text-xs flex items-center">
              {" "}
              <FaEthereum /> {Number(volumeETH).toFixed(4)}{" "}
            </p>
            <p className="text-xs">Used: {count}</p>
          </span>
        </React.Fragment>
      }
    </div>
  );
}

export default BridgeCard;
