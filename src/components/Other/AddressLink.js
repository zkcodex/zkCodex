import React from "react";
import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function AddressLink({ addressFromUrl, theme }) {
  const [isBlur, setIsBlur] = useState(false);

  const handleBlur = () => {
    setIsBlur(!isBlur);
  };
  return (
    <div className="flex items-center gap-2">
      <React.Fragment>
        <a
          href={"https://optimistic.etherscan.io/address/" + addressFromUrl}
          target="_blank"
          rel="noreferrer"
          className={`flex  items-center gap-2 font-semibold  text-indigo-500`}
        >
          <FiLink size={14} />
          <span
            className={`text-[9px] sm:text-xs ${
              theme === "light"
                ? "hover:text-indigo-400"
                : "hover:text-indigo-500"
            }
            
            ${isBlur ? "blur-sm" : "blur-none"}
            
            `}
          >
            {addressFromUrl}
          </span>
        </a>
        <span className="flex items-center gap-2 font-semibold  text-indigo-500">
          {isBlur ? (
            <VscEyeClosed onClick={handleBlur} size={14} />
          ) : (
            <VscEye onClick={handleBlur} size={14} />
          )}{" "}
        </span>
      </React.Fragment>
    </div>
  );
}

export default AddressLink;
