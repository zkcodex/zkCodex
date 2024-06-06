import React, { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";

function ActiveAccount({ ActiveAccount }) {
  const { theme } = useContext(ThemeContext);
  return (
    //   <div
    //   className={`border-l-8 border-l-gray-400 text-[10px] md:text-xs  rounded-md shadow-lg p-2  border
    //   ${theme === "light" ? "border-gray-300 " : "border-gray-600"}

    // `}
    // >

    <div
      className={` text-[10px] md:text-xs  rounded-md shadow-lg p-2  border 
      ${theme === "light" ? "border-gray-300 " : "border-gray-600"}
    `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold ">Active Account </h2>

        <div className="flex flex-col md:flex-row">
          {" "}
          Wallet Age - {ActiveAccount ? ActiveAccount?.firstTX : "-"}
        </div>
      </div>

      <div className="flex justify-between ">
        <div
          className={
            "inline-flex items-center " +
            (new Date(ActiveAccount?.lastTX) <
            new Date().getTime() - 86400 * 7 * 1000
              ? "text-red-500 dark:text-red-400"
              : " ")
          }
        >
          {ActiveAccount ? ActiveAccount?.lastTX : "-"}
        </div>
        <p className=" ">
          {ActiveAccount
            ? ActiveAccount.activeDay +
              (ActiveAccount.activeDay === 1 ? " day" : " day")
            : "- day"}
        </p>

        <p className="">
          {ActiveAccount
            ? ActiveAccount.activeWeek +
              (ActiveAccount.activeWeek === 1 ? " week" : " week")
            : "- week"}
        </p>
        <p className="">
          {ActiveAccount
            ? ActiveAccount.activeMonth +
              (ActiveAccount.activeMonth === 1 ? " month" : " month")
            : "- month"}
        </p>
      </div>
    </div>
  );
}

export default ActiveAccount;
