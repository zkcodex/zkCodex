import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaGasPump } from "react-icons/fa";
import { ThemeContext } from "../../../redux/ThemeContext";
import { FiRefreshCcw } from "react-icons/fi";
import axios from "axios";

function GasPrice() {
  const [gasPrices, setGasPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingOPPrice, setLoadingOPPrice] = useState(true);
  const [opPrice, setOPPrice] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchGasPrices = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_GAS_API_KEY}`
      );

      if (response.status === 200) {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice } =
          response.data.result;
        setGasPrices({
          safeGasPrice: SafeGasPrice,
          proposeGasPrice: ProposeGasPrice,
          fastGasPrice: FastGasPrice,
        });
      }
    } catch (error) {
      console.error("Error fetching gas prices:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOPPrice = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=op&tsyms=usd`
      );

      if (response.status === 200) {
        const data = response.data.USD;
        setOPPrice(data);
      }
    } catch (error) {
      console.error("Error fetching OP price:", error);
    } finally {
      setLoadingOPPrice(false);
    }
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setLoadingOPPrice(true);
    await Promise.all([fetchGasPrices(), fetchOPPrice()]);
    setLoading(false);
    setLoadingOPPrice(false);
  };

  useEffect(() => {
    fetchOPPrice();
    fetchGasPrices();
  }, [fetchGasPrices, fetchOPPrice]);

  return (
    <div
      className={`text-[9px] md:text-xs  ${
        theme === "light" ? "border-gray-300" : "border-gray-600"
      }`}
    >
      <div
        className={`flex border rounded-md  p-1.5 gap-2 items-center
      ${theme === "light" ? "border-gray-300" : "border-gray-600"}
      `}
      >
        {loadingOPPrice ? (
          <div className="flex justify-center items-center">
            <div
              className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                theme === "light" ? "border-gray-400" : ""
              }`}
            ></div>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-around text-[9px] md:text-xs">
            <p className=" text-red-600 font-bold ">OP</p>
            <p className="">{Number(opPrice)?.toFixed(2)} $</p>
          </div>
        )}
        <FiRefreshCcw
          onClick={handleRefresh}
          className="text-[10px] md:text-xs hover:text-green-500 cursor-pointer"
        />
        {loading ? (
          <div className="flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <div
                className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                  theme === "light" ? "border-gray-400" : ""
                }`}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 ">
            <p className="text-[9px] md:text-xs">{gasPrices.proposeGasPrice}</p>
            <FaGasPump className="text-[10px] md:text-xs" />
          </div>
        )}
      </div>
    </div>
  );
}

export default GasPrice;
