/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { getTimeAgo } from "../../../utils/DateUtils";
import { ThemeContext } from "../../../redux/ThemeContext";

import { calculateProtocolState } from "./calculateProtocolState";
import { getPrice } from "../../../service/index";

const ProtocolsCardOP = ({ address, transaction }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(0);

  const [sortOrder, setSortOrder] = useState({
    column: "interactions",
    order: "desc",
  });

  const { theme } = useContext(ThemeContext);

  const [protocolsState, setProtocolsState] = useState([]);

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const price = await getPrice("ETH");
        setPrice(price);
      } catch (error) {
        console.error("Error fetching ethPrice:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (transaction && address) {
      if (!Array.isArray(transaction)) {
        console.error("Invalid transaction data format:", transaction);
        return;
      }

      const protocolsState = calculateProtocolState(transaction, address);
      setProtocolsState(protocolsState);
    }
  }, [transaction, address]);

  const toggleSortOrder = (column) => {
    setSortOrder((prevSortOrder) => ({
      column,
      order:
        prevSortOrder.column === column && prevSortOrder.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const renderSortingArrow = (column) => {
    if (sortOrder.column === column) {
      return sortOrder.order === "asc" ? <FiArrowUp /> : <FiArrowDown />;
    }
    return null ? <FiArrowDown /> : <FiArrowUp />;
  };

  const sortedProtocols = protocolsState.slice().sort((a, b) => {
    const columnA = a[sortOrder.column];
    const columnB = b[sortOrder.column];

    if (sortOrder.order === "asc") {
      if (columnA < columnB) return -1;
      if (columnA > columnB) return 1;
      return 0;
    } else {
      if (columnA < columnB) return 1;
      if (columnA > columnB) return -1;
      return 0;
    }
  });

  const filteredProtocols = sortedProtocols.filter((protocolState) => {
    return protocolState.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div
      className={`relative my-3 rounded-md shadow-lg p-4 border  ${
        theme === "light" ? "border-gray-300" : "border-gray-600"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-left font-bold text-sm lg:text-lg rounded-md">
          Protocols
        </h1>
        <button
          onClick={toggleOpen}
          className={`border p-2 rounded-full text-sm ml-5 font-bold
          ${theme === "light" ? "border-gray-200 " : "border-gray-600"}
          hover:animate-pulse `}
        >
          {isOpen ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      </div>

      {isOpen && (
        <div className="overflow-x-auto min-h-[500px]">
          <div className="flex justify-center my-2">
            <input
              type="text"
              placeholder="Search Dapp"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`py-1.5 text-center px-4 border w-full  xl:w-3/5 rounded-md shadow-md text-xs md:text-sm outline-none font-semibold ${
                theme === "light"
                  ? "border-gray-200"
                  : "bg-transparent border-gray-600"
              }`}
            />
          </div>
          <table className="text-xs md:text-sm text-left w-full overflow-y-auto">
            <thead className="text-[9px] md:text-[11px] text-gray-400 uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-2 cursor-pointer"
                  onClick={() => toggleSortOrder("name")}
                >
                  <span className="flex items-center gap-2 justify-start">
                    Name{renderSortingArrow("name")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-5 py-2 text-center cursor-pointer "
                  onClick={() => toggleSortOrder("interactions")}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Interactions {renderSortingArrow("interactions")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-5 py-2 text-center cursor-pointer"
                  onClick={() => toggleSortOrder("volume")}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Volume {renderSortingArrow("volume")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="text-center cursor-pointer"
                  onClick={() => toggleSortOrder("fees")}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Fee {renderSortingArrow("fees")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="hidden md:block px-5 py-2 text-center cursor-pointer"
                  onClick={() => toggleSortOrder("lastActivity")}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Last Activity {renderSortingArrow("lastActivity")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="rounded-md text-[10px] md:text-xs">
              {filteredProtocols.map((protocolState, index) => (
                <tr
                  className={`${
                    index !== protocolsState.length - 1 &&
                    `border-b  
                    ${
                      theme === "light" ? "border-gray-200" : "border-gray-700 "
                    }
                    
                    `
                  }`}
                  key={protocolState.id}
                >
                  <td className="px-4 py-3 font-medium  cursor-pointer">
                    <div
                      className="flex items-center space-x-4"
                      onClick={() => {
                        window.open(protocolState.url, "_blank");
                      }}
                    >
                      <img
                        className={
                          "w-7 h-7 rounded-full " +
                          (!protocolState.interactions && "grayscale")
                        }
                        src={require(`../../../assets/ico/${protocolState.id}.png`)}
                        alt=""
                      />
                      <div className="font-medium">
                        <div className={`flex text-[9px] md:text-[10px]`}>
                          {protocolState.name}
                        </div>
                        <div className="block md:hidden">
                          <span className="py-1  text-left font-medium whitespace-nowrap">
                            {protocolState.lastActivity === "" ? (
                              <span className=" text-red-500 text-[9px] md:text-[10px]  font-bold   rounded  ">
                                No activity
                              </span>
                            ) : (
                              <span
                                className={
                                  new Date(
                                    protocolState.lastActivity
                                  ).getTime() >
                                  new Date().getTime() - 86400000 * 7
                                    ? "text-green-500 text-[9px] md:text-[10px]"
                                    : "text-yellow-500 text-[9px] md:text-[10px]"
                                }
                              >
                                {getTimeAgo(protocolState.lastActivity)}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center font-medium text-[9px] md:text-[10px] ">
                    {protocolState.interactions}
                  </td>

                  <td className="px-5 py-3 text-center font-medium  text-[9px] md:text-[10px]">
                    {protocolState.volume.toFixed(2)} $
                  </td>
                  <td className="px-5 py-3 text-center font-medium  text-[9px] md:text-[10px]">
                    {(protocolState.fees * price).toFixed(2)} $
                  </td>

                  <td className="hidden md:block px-5 py-3 text-center font-medium whitespace-nowrap">
                    {protocolState.lastActivity === "" ? (
                      <span className="text-red-500 text-[9px] md:text-[10px] font-bold rounded">
                        No activity
                      </span>
                    ) : (
                      <span
                        className={
                          new Date(protocolState.lastActivity).getTime() >
                          new Date().getTime() - 86400 * 7 * 1000
                            ? "text-green-500 text-[9px] md:text-[10px]"
                            : "text-yellow-500 text-[9px] md:text-[10px]"
                        }
                      >
                        {getTimeAgo(protocolState.lastActivity)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProtocolsCardOP;
