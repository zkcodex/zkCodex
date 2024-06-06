import React, { useContext } from "react";

import { ThemeContext } from "../../redux/ThemeContext";

function ContractCount({ uniqueContract, last7Days, totalContract }) {
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
            <h2 className="text-sm font-bold  ">Interacted Contracts</h2>
            <div className="flex gap-2 text-xs items-center">
              {last7Days && (
                <div
                  className={
                    "text-xs font-bold " +
                    (!last7Days
                      ? "text-red-500 dark:text-red-400"
                      : "text-green-500 dark:text-green-400")
                  }
                >
                  +{Math.round(last7Days)}{" "}
                </div>
              )}
              <span className="text-[10px] font-bold text-gray-500">7d</span>
            </div>
          </span>
          <span className="flex justify-between text-xs items-center">
            <p className=" font-bold">
              Unique : <span className="font-normal"> {uniqueContract}</span>
            </p>
            <p className="  font-bold">
              Total : <span className="font-normal">{totalContract}</span>
            </p>
          </span>
        </React.Fragment>
      }
    </div>
  );
}

export default ContractCount;
