import React, { useContext, useState } from "react";
import { ThemeContext } from "../../redux/ThemeContext";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaEthereum } from "react-icons/fa";
function BalanceCard({ balance, usdValue }) {
  const { theme } = useContext(ThemeContext);
  const [isHideBalance, setIsHideBalance] = useState(false);

  const handleHideBalance = () => {
    setIsHideBalance(!isHideBalance);
  };

  return (
    <div
      className={`rounded-md shadow-lg p-4 border  ${
        theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"
      }`}
    >
      {
        <React.Fragment>
          <span className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold">Balance</h2>
            <div className="flex gap-2 text-xs items-center">
              <button
                onClick={handleHideBalance}
                className={`cursor-pointer ${
                  theme === "light"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                {isHideBalance ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
          </span>
          <span className="flex justify-between">
            {isHideBalance ? (
              <>
                <p className="text-xs">$ {Number(usdValue).toFixed(2)}</p>
                <p className=" text-xs flex items-center">
                  {" "}
                  <FaEthereum /> {Number(balance).toFixed(4)}{" "}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs">$ ****</p>
                <p className=" text-xs flex items-center">
                  {" "}
                  <FaEthereum /> ****
                </p>
              </>
            )}
          </span>
        </React.Fragment>
      }
    </div>
  );
}

export default BalanceCard;
