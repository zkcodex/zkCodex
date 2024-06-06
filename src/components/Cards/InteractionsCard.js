import React, { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";
const InteractionsCard = ({ interactions, last7Days, networkData }) => {
  const { theme } = useContext(ThemeContext);

  const transactions = networkData?.transactions || [];

  const approveTransactions = [];

  transactions.forEach((transaction) => {
    const { functionName } = transaction;

    if (functionName?.includes("approve")) {
      approveTransactions?.push(transaction);
    }
  });

  return (
    <div
      className={`rounded-md shadow-lg p-4 border  ${
        theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"
      }`}
    >
      {
        <React.Fragment>
          <span className="flex justify-between mb-2 items-center">
            <h2 className="text-sm font-bold  ">Interactions </h2>
            <div className="flex gap-2 items-center text-[11px]">
              {last7Days && (
                <div
                  className={
                    " font-bold " +
                    (!last7Days ? "text-red-500 " : "text-green-500")
                  }
                >
                  +{Math.round(last7Days)}{" "}
                </div>
              )}
              <span className="text-[10px] font-bold text-gray-500">7d</span>
            </div>
          </span>

          <span className="flex justify-between items-center">
            <p className=" text-xs"> {interactions ? interactions : "-"} </p>
            {approveTransactions && approveTransactions?.length > 0 && (
              <p className=" text-xs">
                {" "}
                <span className="font-bold mr-1">Approve : </span>
                {approveTransactions ? approveTransactions?.length : "-"}{" "}
              </p>
            )}
          </span>
        </React.Fragment>
      }
    </div>
  );
};

export default InteractionsCard;
