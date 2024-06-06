import React, { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";
import { FaEthereum } from "react-icons/fa";

function FeeCard({ feeETH, last7Days, feeUSD }) {
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
            <h2 className="text-sm font-bold">Fees</h2>
            <div className="flex gap-2 text-xs items-center">
              <p
                className={`  ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              ></p>
              {last7Days && (
                <React.Fragment>
                  <div
                    className={
                      "text-xs font-bold " +
                      (!last7Days
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-500 dark:text-green-400")
                    }
                  >
                    +${Math.round(last7Days)}
                  </div>
                </React.Fragment>
              )}
              <span className="text-xs text-gray-500 font-bold">7d</span>
            </div>
          </span>
          <span className="flex items-center justify-between">
            <span className="text-xs">$ {Number(feeUSD).toFixed(2)}</span>
            <p className=" text-xs flex items-center">
              {" "}
              <FaEthereum /> {Number(feeETH).toFixed(4)}{" "}
            </p>
            <p className="text-xs"></p>
          </span>
        </React.Fragment>
      }
    </div>
  );
}

export default FeeCard;
