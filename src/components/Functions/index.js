import { getBalanceUsingRPC } from "../../service/index";
import {
  countAllTransactionPeriods,
  getTimeAgoFirst,
} from "../../utils/DateUtils";

export const ActiveOP = async (transactions, address) => {
  let activeAccount = {};
  let lastTX = null;
  let firstTX = null;

  const { days, weeks, months } = countAllTransactionPeriods(
    address,
    transactions
  );

  if (transactions.length > 0) {
    lastTX = getTimeAgoFirst(transactions[0].timeStamp);
    firstTX = getTimeAgoFirst(transactions[transactions.length - 1].timeStamp);
  }

  activeAccount = {
    activeMonth: months,
    activeWeek: weeks,
    activeDay: days,
    firstTX,
    lastTX,
  };

  return activeAccount;
};

export const InteractionsOP = async (transactions) => {
  let Interactions = {};
  let last7Days = 0;
  let interactions = 0;

  transactions.forEach((transaction) => {
    const transactionTimestamp = new Date(
      parseInt(transaction.timeStamp)
    ).getTime();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (transactionTimestamp >= oneWeekAgo.getTime()) {
      last7Days += 1;
    }

    interactions += 1;
  });

  Interactions = {
    last7Days,
    interactions,
  };

  return Interactions;
};

export const VolumeOP = async (transactions, price) => {
  if (!transactions || !transactions.length) {
    console.error("Invalid or empty transactions array.");
    return null;
  }
  let volumeETH = 0;
  let volumeUSD = 0;
  let last7Days = 0;

  transactions.forEach((transaction) => {
    if (
      transaction.transfers &&
      transaction.transfers.length > 0 &&
      transaction.functionName !== "faucet()"
    ) {
      const firstTransfer = transaction?.transfers[0];
      const secondTransfer = transaction?.transfers[1];

      let transferValueUSD = parseFloat(firstTransfer?.valueUSD);
      if (isNaN(transferValueUSD) && secondTransfer) {
        transferValueUSD = parseFloat(secondTransfer?.valueUSD);
      }

      if (!isNaN(transferValueUSD)) {
        const transactionTimestamp = new Date(
          parseInt(transaction.timeStamp)
        ).getTime();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        if (transactionTimestamp >= oneWeekAgo.getTime()) {
          last7Days += transferValueUSD;
        }
        volumeUSD += transferValueUSD;
      }
    } else {
      const transactionValue = parseFloat(transaction?.valueUSD || 0);
      if (!isNaN(transactionValue) && !isNaN(price)) {
        volumeUSD += transactionValue;

        const transactionTimestamp = new Date(
          parseInt(transaction.timeStamp)
        ).getTime();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        if (transactionTimestamp >= oneWeekAgo.getTime()) {
          last7Days += parseFloat(transaction?.valueUSD);
        }
      } else {
        console.warn("Invalid transaction value or price:", transaction, price);
      }
    }
  });

  volumeETH = volumeUSD / price;

  return {
    volumeETH,
    volumeUSD,
    last7Days,
  };
};

export const FunctionNameOP = (transactions) => {
  const functionNameCount = {};

  transactions.forEach((transaction) => {
    if (transaction?.functionName === undefined) return;
    const functionName =
      transaction?.functionName && transaction?.functionName?.toUpperCase();
    const functionTypes = [
      "WITHDRAW",
      "DEPOSIT",
      "APPROVE",
      "DELEGATE",
      "TRANSFER",
      "SWAP",
      "ATTEST",
      "FREEMINT",
      "MINT",
      "PURCHASE",
      "BINDING",
      "BURN",
    ];

    functionTypes.forEach((type) => {
      if (functionName?.includes(type)) {
        functionNameCount[type] = (functionNameCount[type] || 0) + 1;
      }
    });
  });

  return functionNameCount;
};

export const FeesOP = async (transactions, price) => {
  let feeETH = 0;
  let feeUSD = 0;

  let last7Days = 0;
  let Fees = {};

  transactions.forEach((transaction) => {
    const transactionTimestamp = new Date(
      parseInt(transaction.timeStamp)
    ).getTime();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (transactionTimestamp >= oneWeekAgo.getTime()) {
      last7Days += transaction.fee * price;
    }

    feeUSD += transaction.fee * price;
    feeETH += transaction.fee;
  });

  Fees = {
    feeETH,
    feeUSD,
    last7Days,
  };

  return Fees;
};

export const ContractOP = async (transactions) => {
  let uniqueContract = new Set();
  let totalContract = 0;
  let Contract = {};
  let last7Days = new Set();

  transactions.forEach((transaction) => {
    const transactionTimestamp = new Date(
      parseInt(transaction.timeStamp)
    ).getTime();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (transactionTimestamp >= oneWeekAgo.getTime()) {
      last7Days.add(transaction.to);
    }

    totalContract += 1;
    uniqueContract.add(transaction.to);
  });
  Contract = {
    last7Days: last7Days.size,
    uniqueContract: uniqueContract.size,
    totalContract,
  };
  return Contract;
};

export const NftMintOP = async (transactions) => {
  let NftMint = {};
  let last7Days = 0;
  let uniqueMintTokens = new Set();
  let totalMintCount = 0;

  transactions.forEach((transaction) => {
    if (transaction.functionName?.includes("mint")) {
      const transactionTimestamp = new Date(
        parseInt(transaction.timeStamp)
      ).getTime();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (transactionTimestamp >= oneWeekAgo.getTime()) {
        last7Days += 1;
      }

      uniqueMintTokens.add(transaction.to);

      totalMintCount += 1;
    }
  });
  NftMint = {
    totalMintCount,
    last7Days,
    MintTokens: uniqueMintTokens.size,
  };
  return NftMint;
};

export const BalanceOP = async (address) => {
  const fetch = await getBalanceUsingRPC(address);
  return fetch;
};

export const TokenOP = async (tokens) => {
  const findERC721Tokens = (tokens) => {
    return tokens.filter(
      (token) =>
        token.token.type === "ERC-721" || token.token.type === "ERC-1155"
    );
  };

  const findERC20Tokens = (tokens) => {
    return tokens.filter((token) => token.token.type === "ERC-20");
  };

  let TOKEN = [];
  let NFTS = [];

  let tokenUniqueCount = 0;
  let nftUniqueCount = 0;

  const erc20Tokens = findERC20Tokens(tokens);
  const erc721Tokens = findERC721Tokens(tokens);

  erc20Tokens.forEach((token) => {
    tokenUniqueCount += 1;

    TOKEN.push({
      name: token.token.name,
      symbol: token.token.symbol,
      address: token.token.address,
      balance: token?.value / 10 ** token?.token?.decimals,
      decimals: token.token.decimals,
    });
  });

  erc721Tokens.forEach((nft) => {
    nftUniqueCount += 1;
    NFTS.push({
      name: nft.token.name,
      symbol: nft.token.symbol,
      address: nft.token.address,
      balance: nft.value,
    });
  });

  return {
    TOKEN,
    NFTS,
    tokenUniqueCount,
    nftUniqueCount,
  };
};
