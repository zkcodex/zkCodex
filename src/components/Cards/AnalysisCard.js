import React, { useState, useEffect, useContext } from "react";
import {
  calculateAverageFee,
  calculateAverageVolume,
  calculateApprovalRate,
  calculateContractToNftRatio,
  calculateDailyTransactionAverage,
  calculateMonthlyTransactionAverage,
  findMostInteractedContract,
  findApprovalTransactions,
  findMaxMinTransaction,
} from "../Functions/AnalysisData";
import { ThemeContext } from "../../redux/ThemeContext";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export const AnalysisCard = ({ data, userAddress }) => {
  const { theme } = useContext(ThemeContext);
  const [averageFee, setAverageFee] = useState({ eth: 0, usd: 0 });
  const [averageVolume, setAverageVolume] = useState({ eth: 0, usd: 0 });

  const [approvalRate, setApprovalRate] = useState(null);
  const [contractToNftRatio, setContractToNftRatio] = useState(0);
  const [dailyTxAverage, setDailyTxAverage] = useState(0);
  const [monthlyTxAverage, setMonthlyTxAverage] = useState(0);
  const [mostInteractedContract, setMostInteractedContract] = useState({});
  const [totalTransactions, setTotalTransactions] = useState(0);
  // const [maxTransaction, setMaxTransaction] = useState(null);
  const [maxVolume, setMaxVolume] = useState(0);

  useEffect(() => {
    if (data.transactions && data.transactions.length > 0) {
      const totalTx = data.Interactions.interactions;
      setTotalTransactions(totalTx);
      setAverageFee(calculateAverageFee(data.Fees, totalTx));
      setAverageVolume(calculateAverageVolume(data.Volume, totalTx));

      const approvalTxs = findApprovalTransactions(data.transactions);
      if (approvalTxs.length > 0) {
        setApprovalRate(calculateApprovalRate(approvalTxs, totalTx));
      }
      setContractToNftRatio(
        calculateContractToNftRatio(
          data?.Contract?.totalContract,
          data?.NFTMint?.totalMintCount
        )
      );
      setDailyTxAverage(
        calculateDailyTransactionAverage(totalTx, data.ActiveAccount.activeDay)
      );
      setMonthlyTxAverage(
        calculateMonthlyTransactionAverage(
          totalTx,
          data.ActiveAccount.activeMonth
        )
      );
      setMostInteractedContract(
        findMostInteractedContract(data.transactions, userAddress)
      );

      const { maxVolume } = findMaxMinTransaction(data.transactions);
      // setMaxTransaction(maxTransaction);
      setMaxVolume(maxVolume);
    }
  }, [data, userAddress]);

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`py-2 px-4 flex flex-col w-full border rounded-md shadow-md
    ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm md:text-lg font-bold  my-2">
          Analysis <span className="text-yellow-500">(BETA)</span>
        </h3>
        <button
          onClick={toggleOpen}
          className={`border p-2 rounded-full text-sm ml-5 font-bold
          ${theme === "light" ? "border-gray-200 " : "border-gray-600"}
          hover:animate-pulse`}
        >
          {isOpen ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      </div>

      {isOpen && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Fee Per Transaction</p>
            <p className="text-xs sm:text-sm font-semibold">
              {averageFee.eth.toFixed(4)} ETH / {averageFee.usd.toFixed(2)} USD
            </p>
          </div>
          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Volume Per Transaction</p>
            <p className="text-xs sm:text-sm font-semibold">
              {averageVolume.eth.toFixed(4)} ETH /{" "}
              {averageVolume.usd.toFixed(2)} USD
            </p>
          </div>

          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Total Contract/NFT Ratio</p>
            <p className="text-xs sm:text-sm font-semibold">
              {contractToNftRatio.toFixed(2)}
            </p>
          </div>
          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Daily Transaction Average</p>
            <p className="text-xs sm:text-sm font-semibold">
              {dailyTxAverage.toFixed(2)}
            </p>
          </div>
          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Monthly Transaction Average</p>
            <p className="text-xs sm:text-sm font-semibold">
              {monthlyTxAverage.toFixed(2)}
            </p>
          </div>
          <div className="p-2 rounded-lg shadow-md">
            <p className="text-gray-600">Total Transactions</p>
            <p className="text-xs sm:text-sm font-semibold">
              {totalTransactions}
            </p>
          </div>
          {maxVolume > 0 && (
            <div className="p-2 rounded-lg shadow-md">
              <p className="text-gray-600">Highest Volume Transaction</p>
              <p className="text-xs sm:text-sm font-semibold">
                {maxVolume.toFixed(2)} USD
              </p>
            </div>
          )}
          {approvalRate !== null && (
            <div className="p-2 rounded-lg shadow-md">
              <p className="text-gray-600">Transaction Approval Rate</p>
              <p className="text-xs sm:text-sm font-semibold">
                {(approvalRate * 100).toFixed(2)}%
              </p>
            </div>
          )}
          {mostInteractedContract && (
            <div className="p-2 rounded-lg shadow-md md:col-span-2">
              <p className="text-gray-600">Most Interacted Contract/Address</p>
              <p className="text-xs sm:text-sm font-semibold">
                {mostInteractedContract.address} ({mostInteractedContract.count}{" "}
                interactions)
              </p>
            </div>
          )}
          {/* {maxTransaction && (
            <div className="p-2 rounded-lg shadow-md md:col-span-2">
              <p className="text-gray-600">High Value Transaction</p>
              <p className="text-xs sm:text-sm font-semibold">
                {maxTransaction.hash} (
                {(parseFloat(maxTransaction.valueUSD) || 0).toFixed(2)} USD)
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;
