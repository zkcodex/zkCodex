import axios from "axios";
import {
  ActiveOP,
  ContractOP,
  FeesOP,
  FunctionNameOP,
  InteractionsOP,
  NftMintOP,
  BalanceOP,
  TokenOP,
  VolumeOP,
} from "../components/Functions";
import { ethers } from "ethers";

const OP_BRIDGE_ADDRESS = "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1";
const API_URL = "https://optimism.blockscout.com/api/v2/addresses/";
const priceCache = {};

// export const getTokens = async (address) => {
//   if (address === "") return { success: false };
//   const apiKey = ["918b2900-8175-447f-935f-7fc901c1b72a"];

//   const tokenList = [];
//   const limit = 100;
//   let page = 1;
//   let totalPage = 0;

//   try {
//     while (true) {
//       const response = await axios.get(`${OKLINK_API}`, {
//         params: {
//           chainShortName: "optimism",
//           address: address,
//           protocolType: "token_721",
//           limit: limit,
//           page: page,
//         },
//         headers: {
//           "OK-ACCESS-KEY": apiKey[Math.floor(Math.random() * apiKey.length)],
//         },
//       });

//       if (response.status === 200) {
//         totalPage = response.data.data[0].totalPage;
//         tokenList.push(...response.data.data[0].tokenList);
//         if (page >= totalPage) {
//           break;
//         }
//         page++;
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     }

//     return tokenList;
//   } catch (error) {
//     console.error("Error fetching token data:", error);
//     return [];
//   }
// };

export const getPrice = async (symbol) => {
  const cachedPrice = priceCache[symbol];
  if (cachedPrice) {
    return cachedPrice;
  }

  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=usd`
    );
    const price = response.data.USD;
    priceCache[symbol] = price;

    return price;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw error;
  }
};

export const assignTransferValues = async (transactions) => {
  if (!transactions) {
    throw new Error("Transactions array is required.");
  }

  try {
    await Promise.all(
      transactions.map(async (transaction) => {
        await Promise.all(
          transaction.transfers.map(async (transfer) => {
            transfer.valueUSD =
              (Number(transfer.value) / 10 ** transfer.tokenDecimal) *
              (await getPrice(transfer.tokenSymbol));
          })
        );
        if (!transaction?.transfers?.length) {
          transaction.valueUSD =
            Number(transaction.value * 1e-18) * (await getPrice("ETH"));
        }
      })
    );
    return transactions;
  } catch (error) {
    console.error("Error assigning transfer values:", error);
    throw error;
  }
};

const formatTokenTX = (tokenTX) => {
  return tokenTX.map((tx) => ({
    hash: String(tx?.tx_hash).toLowerCase(),
    from: String(tx?.from.hash).toLowerCase(),
    to: String(tx?.to.hash).toLowerCase(),
    timeStamp: Number(new Date(tx.timestamp).getTime()),
    tokenName: tx?.token?.name,
    tokenSymbol: tx?.token?.symbol,
    tokenDecimal: Number(tx?.token?.decimals),
    contractAddress: tx?.token?.address,

    value: Number(tx.total?.value),
    type: tx?.type,
    price: tx.token?.exchange_rate,
  }));
};

const formatTransactionTX = (transactions) => {
  return transactions.map((tx) => ({
    blockNumber: Number(tx.block),
    hash: String(tx?.hash).toLowerCase(),
    from: String(tx?.from?.hash).toLowerCase(),
    to: String(tx?.to?.hash).toLowerCase(),
    timeStamp: Number(new Date(tx.timestamp).getTime()),
    value: tx?.value,
    functionName: tx?.method?.toLowerCase(),
    status: tx.status,
    fee: (Number(tx?.gas_price) * Number(tx?.gas_used)) / 10 ** 18,
    feeL1: (Number(tx?.l1_gas_price) * Number(tx?.l1_gas_used)) / 10 ** 18,
    input: tx.input,
    transfers: [],
    exchange_rate: tx?.exchange_rate,
    is_contract: tx?.to?.is_contract,
  }));
};

const fetchTokenBalance = async (address) => {
  try {
    const response = await axios.get(`${API_URL}${address}/tokens/`);
    if (response.status !== 200 || !response.data.items) {
      console.error("Error fetching token balance:", response);
      return [];
    }
    return response.data.items;
  } catch (error) {
    console.error("Token balance ERROR", error);
    return [];
  }
};

const fetchTokenTX = async (address) => {
  let tokenTX = [];
  try {
    let nextPageParams = null;

    while (true) {
      const nextPage = nextPageParams
        ? `${API_URL}${address}/token-transfers?block_number=${nextPageParams.block_number}&index=${nextPageParams.index}`
        : `${API_URL}${address}/token-transfers`;

      const response = await axios.get(nextPage);
      if (response.status !== 200 || !response.data.items) {
        console.error("Error fetching transactions:", response);
        break;
      }

      tokenTX = tokenTX.concat(response.data.items);

      // Check if there are more pages by examining the next_page_params
      nextPageParams = response.data.next_page_params;

      if (!nextPageParams) {
        // If there are no more pages, exit the loop
        break;
      }
    }

    return tokenTX;
  } catch (error) {
    console.error("Data Corrupt", error);

    // Instead of throwing an error, return an object with empty data
    return [];
  }
};

const fetchTransactions = async (address) => {
  let transactions = [];
  try {
    let nextPageParams = null;

    while (true) {
      const nextPage = nextPageParams
        ? `${API_URL}${address}/transactions?block_number=${nextPageParams.block_number}&index=${nextPageParams.index}`
        : `${API_URL}${address}/transactions`;

      const response = await axios.get(nextPage);
      if (response.status !== 200 || !response.data.items) {
        console.error("Error fetching transactions:", response);
        break;
      }
      transactions = transactions.concat(response.data.items);

      nextPageParams = response.data.next_page_params;
      if (!nextPageParams) {
        break;
      }
    }

    return transactions;
  } catch (error) {
    console.error("Data Corrupt", error);

    return [];
  }
};

export const fetchAllDataOP = async (address) => {
  try {
    const transactionsResponse = await fetchTransactions(address);
    const tokenListResponse = await fetchTokenBalance(address);
    const tokenTXResponse = await fetchTokenTX(address);

    const formatedTokenList = tokenListResponse;
    const formatedTokenTX =
      transactionsResponse && formatTokenTX(tokenTXResponse);
    const formatedTransactionTX =
      transactionsResponse && formatTransactionTX(transactionsResponse);

    const transactionMap = new Map();

    formatedTokenTX.forEach((tokenTransaction) => {
      const parentTransactionHash = tokenTransaction.hash;
      if (!transactionMap.has(parentTransactionHash)) {
        transactionMap.set(parentTransactionHash, []);
      }
      transactionMap.get(parentTransactionHash).push(tokenTransaction);
    });

    const mergedTransactionsFormater = formatedTransactionTX.map(
      (transaction) => {
        const parentTransactionHash = transaction.hash;
        const tokenTransactions =
          transactionMap.get(parentTransactionHash) || [];

        return {
          ...transaction,
          transfers: tokenTransactions,
        };
      }
    );
    const transactionFormatter = await assignTransferValues(
      mergedTransactionsFormater
    );

    const ActiveAccount =
      (await ActiveOP(mergedTransactionsFormater, address)) || {};
    const Volume =
      (await VolumeOP(transactionFormatter, await getPrice("ETH"))) || {};
    const Interactions =
      (await InteractionsOP(mergedTransactionsFormater)) || {};
    const Bridge =
      (await BridgeOP(address, OP_BRIDGE_ADDRESS, await getPrice("ETH"))) || {};
    const Contract = (await ContractOP(mergedTransactionsFormater)) || {};
    const NFTMint = (await NftMintOP(mergedTransactionsFormater)) || {};
    const Fees =
      (await FeesOP(mergedTransactionsFormater, await getPrice("ETH"))) || {};
    const Balance = (await BalanceOP(address)) || {};
    const Tokens = (await TokenOP(formatedTokenList)) || [];
    const Functions = FunctionNameOP(mergedTransactionsFormater);

    const OPT = {
      ActiveAccount: ActiveAccount || {},
      Volume: Volume || {},
      Bridge: Bridge || {},
      Interactions: Interactions || {},
      NFTMint: NFTMint || {},
      Fees: Fees || {},
      Contract: Contract || {},
      Balance: Balance || {},
      Tokens: Tokens || [],
      Functions: Functions || [],
      transactions: transactionFormatter || [],
    };
    return OPT;
  } catch (error) {
    console.error("Data Corrupt", error);
    return {
      ActiveAccount: {},
      Volume: {},
      Interactions: {},
      NFTMint: {},
      Fees: {},
      Contract: {},
      Balance: {},
      Tokens: [],
      Functions: [],
      transactions: [],
    };
  }
};

export const getBalanceUsingRPC = async (address) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://mainnet.optimism.io/"
    );
    const balance = await provider?.getBalance(address);
    const usdValue =
      Number(ethers.utils.formatEther(balance)) * (await getPrice("ETH"));

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

export const BridgeOP = async (address, BRIDGE_ADDRESS, price) => {
  let volumeETH = 0;
  let volumeUSD = 0;
  let count = 0;
  let last7Days = 0;
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY2}`
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
      const transactionTimestamp = parseInt(tx.timeStamp) * 1000;
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
