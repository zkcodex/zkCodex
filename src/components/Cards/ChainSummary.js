import React from "react";
import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function ChainSummary({ networkData, theme }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {networkData?.Functions && (
        <div
          className={`my-4 p-2 px-4 text-xs border rounded-md
 ${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
`}
        >
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-sm md:text-lg font-semibold  my-2">
                Chain Summary
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
                  className={`
                    

                `}
                  style={{ maxHeight: "500px" }}
                >
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mt-4 text-[10px] md:text-xs">
                    {Object.entries(networkData.Functions).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className={`border shadow-md rounded-md p-1.5
${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
`}
                        >
                          <span className="flex justify-between items-center  ">
                            <p className=""> {key}</p>
                            <p>{value}</p>
                          </span>
                        </div>
                      )
                    )}
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

export default ChainSummary;
