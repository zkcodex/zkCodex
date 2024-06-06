import React, { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";
import { FaEthereum } from "react-icons/fa";

const VolumeCard = ({ last7Days, volumeETH, volumeUSD }) => {
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
            <h2 className="text-sm font-bold  ">Volume</h2>
            <div className="flex  text-xs gap-2">
              <div
                className={
                  "text-xs font-bold " +
                  (!last7Days
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-500 dark:text-green-400")
                }
              >
                +${Math.round(last7Days) || 0}
                <span className="text-[10px] px-1 text-gray-500 ">7d</span>
              </div>
            </div>
          </span>
          <span className="flex justify-between">
            <p className=" text-xs">$ {Math.round(volumeUSD) ||"-"} </p>
            <p className=" text-xs flex items-center">
              {" "}
              <FaEthereum /> {Number(volumeETH).toFixed(4) || "-"}{" "}
            </p>
            <p className=" text-xs"></p>
          </span>
        </React.Fragment>
      }
    </div>
  );
};

export default VolumeCard;
