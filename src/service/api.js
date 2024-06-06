import axios from "axios";
import { ethers } from "ethers";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY2;

//ETH BALANCE

// export const getPrice = async (symbol) => {
//   try {
//     const response = await axios.get(
//       ` https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=usd`
//     );
//     return response.data.USD;
//   } catch (error) {
//     console.error(`Error fetching price for ${symbol}:`, error);
//     throw error;
//   }
// };

const priceCache = {};

export const getPrice = async (symbol) => {
  // Check if the price is cached
  const cachedPrice = priceCache[symbol];
  if (cachedPrice) {
    return cachedPrice;
  }

  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=usd`
    );

    const price = response.data.USD;

    // Cache the price for 5 minutes (300 seconds)
    priceCache[symbol] = price;

    return price || 0;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return 0;
  }
};

const price = await getPrice("ETH");

//CHAIN ETH BALANCE
export const getBalanceUsingRPC = async (address, chain) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(chain);
    const balance = await provider?.getBalance(address);
    const usdValue = Number(ethers.utils.formatEther(balance)) * Number(price);

    return {
      status: 200,
      balance: ethers.utils.formatEther(balance),
      usdValue: usdValue,
    };
  } catch {
    return {
      balance: 0,
      usdValue: 0,
      status: 404,
      errorType: "error",
      message: "API connection failed! Try again later.",
    };
  }
};

export const BridgeDATA = async (address, BRIDGE_ADDRESS) => {
  let volumeETH = 0;
  let volumeUSD = 0;
  let count = 0;
  let last7Days = 0;
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    );

    const bridgeTxs = response.data.result.filter(
      (tx) => tx.to.toLowerCase() === BRIDGE_ADDRESS.toLowerCase()
    );

    const bridgeData = bridgeTxs.map((tx) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      timeStamp: tx.timeStamp,
    }));

    bridgeData.forEach((tx) => {
      const transactionTimestamp = new Date(
        parseInt(tx.timeStamp) * 1000
      ).getTime();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (transactionTimestamp >= oneWeekAgo.getTime()) {
        last7Days += parseFloat(tx.value) * 1e-18 * price;
      }

      count += 1;

      volumeUSD += parseFloat(tx.value) * 1e-18 * price;
      volumeETH += parseFloat(tx.value) * 1e-18;
    });
    return {
      volumeETH,
      volumeUSD,
      count,
      last7Days,
      BRIDGE_ADDRESS,
    };
  } catch (error) {
    console.error("BRIDGE TRANSACTION ERROR", error);
    throw error;
  }
};

export const getEthTransactions = async (address) => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    );
    const data = response.data.result;
    if (data.length === 0) return null;

    const totalTransactions = data.length;
    let totalInTransactions = 0;
    let totalOutTransactions = 0;

    const uniqueOutDays = new Set();
    let firstTransactionDate = null;

    data.forEach((transaction) => {
      if (transaction.from.toLowerCase() === address.toLowerCase()) {
        totalOutTransactions++;

        const timestamp = parseInt(transaction.timeStamp);
        const date = new Date(timestamp * 1000);
        const formattedDate = `${date.getUTCFullYear()}-${
          date.getUTCMonth() + 1
        }-${date.getUTCDate()}`;
        uniqueOutDays.add(formattedDate);
      }
      if (transaction.to.toLowerCase() === address.toLowerCase()) {
        totalInTransactions++;
      }

      const timestamp = parseInt(transaction.timeStamp);
      const date = new Date(timestamp * 1000);
      if (!firstTransactionDate) {
        firstTransactionDate = date;
      } else if (date < firstTransactionDate) {
        firstTransactionDate = date;
      }
    });

    const formattedFirstTransactionDate = `${firstTransactionDate.getUTCFullYear()}-${
      firstTransactionDate.getUTCMonth() + 1
    }-${firstTransactionDate.getUTCDate()}`;

    const totalUniqueOutDays = uniqueOutDays.size;

    return {
      totalTransactions: totalTransactions || 0,
      totalInTransactions: totalInTransactions || 0,
      totalOutTransactions: totalOutTransactions || 0,
      firstTransactionDate: formattedFirstTransactionDate || null,
      totalUniqueOutDays,
      transactions: data,
    };
  } catch (error) {
    console.error("Error fetching eth transactions:", error);
    return null;
  }
};
