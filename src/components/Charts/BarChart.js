import React, { useState, useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { ThemeContext } from "../../redux/ThemeContext";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function TransactionChart({ address, transactions }) {
  const [chartType, setChartType] = useState("monthly");
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const chartData = useMemo(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const parseTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return {
        month: monthNames[date.getUTCMonth()],
        year: date.getUTCFullYear(),
        day: date.getUTCDate(),
      };
    };

    const dataMap = {};

    transactions?.forEach((transaction) => {
      if (
        !transaction ||
        transaction.from.toLowerCase() !== address.toLowerCase()
      )
        return;
      const { month, year, day } = parseTimestamp(transaction.timeStamp);
      const key =
        chartType === "daily" ? `${month} ${day}, ${year}` : `${month} ${year}`;
      dataMap[key] = (dataMap[key] || 0) + 1;
    });

    const sortedData = Object.entries(dataMap)
      .map(([name, Transactions]) => ({ name, Transactions }))
      .sort((a, b) => new Date(a.name) - new Date(b.name));

    return sortedData;
  }, [transactions, chartType, address]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border p-1 px-4 my-2 rounded-md shadow-lg ${
        theme === "light" ? "border-gray-300" : "border-gray-600"
      }`}
    >
      <div
        className={`flex justify-between my-2 items-center rounded-sm ${
          theme === "light" ? "border-gray-200" : "border-gray-600"
        }`}
      >
        <h2 className="text-sm sm:text-base md:text-lg font-semibold">
          Transaction Chart
        </h2>
        <button
          onClick={toggleOpen}
          className={`border p-2 rounded-full text-xs sm:text-sm ml-5 font-bold ${
            theme === "light" ? "border-gray-200" : "border-gray-600"
          } hover:animate-pulse`}
        >
          {isOpen ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      </div>

      {isOpen && (
        <>
          {chartData.length > 0 ? (
            <div className="my-1">
              <div
                className={`flex justify-end text-xs md:text-sm rounded-md ${
                  theme === "light" ? "border-gray-200" : "border-gray-600"
                }`}
              >
                <button
                  className={`px-2 border py-1 rounded-sm ${
                    theme === "light" ? "border-gray-200" : "border-gray-600"
                  } ${
                    chartType === "monthly"
                      ? "bg-indigo-500 text-white"
                      : "bg-transparent"
                  }`}
                  onClick={() => setChartType("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-2 rounded-sm py-1 border ${
                    theme === "light" ? "border-gray-200" : "border-gray-600"
                  } ${
                    chartType === "daily"
                      ? "bg-indigo-500 text-white"
                      : "bg-transparent"
                  }`}
                  onClick={() => setChartType("daily")}
                >
                  Daily
                </button>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="1 1"
                    stroke={
                      theme === "light"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(255,255,255,0.1)"
                    }
                  />
                  <XAxis className="text-[10px] sm:text-xs" dataKey="name" />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.2)" }}
                    contentStyle={{
                      backgroundColor: theme === "light" ? "#fff" : "#1a202c",
                      color: theme === "light" ? "#000" : "#fff",
                      border: "none",
                    }}
                  />
                  <Bar maxBarSize={30} dataKey="Transactions" fill="#8884d8" />
                  <Brush
                    dataKey="name"
                    height={30}
                    stroke={theme === "light" ? "#8884d8" : "#8884d8"}
                    gap={1}
                    fill={theme === "light" ? "#f5f5f5" : "#333333"}
                  >
                    <BarChart>
                      <Bar
                        maxBarSize={10}
                        dataKey="Transactions"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </Brush>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span className="text-sm font-semibold text-gray-500">
                No Transactions
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
