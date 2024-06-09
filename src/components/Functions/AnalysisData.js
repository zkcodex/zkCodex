const calculateAverageFee = (feeData, totalTransactions) => {
  const totalFeeETH = feeData.feeETH || 0;
  const totalFeeUSD = feeData.feeUSD || 0;
  return {
    eth: totalTransactions ? totalFeeETH / totalTransactions : 0,
    usd: totalTransactions ? totalFeeUSD / totalTransactions : 0,
  };
};

const calculateAverageVolume = (volumeData, totalTransactions) => {
  const totalVolumeETH = volumeData.volumeETH || 0;
  const totalVolumeUSD = volumeData.volumeUSD || 0;
  return {
    eth: totalTransactions ? totalVolumeETH / totalTransactions : 0,
    usd: totalTransactions ? totalVolumeUSD / totalTransactions : 0,
  };
};

const calculateContractToNftRatio = (totalContracts, totalMintCount) => {
  return totalMintCount ? totalContracts / totalMintCount : 0;
};

const calculateDailyTransactionAverage = (totalTransactions, activeDays) => {
  return activeDays ? totalTransactions / activeDays : 0;
};

const calculateMonthlyTransactionAverage = (
  totalTransactions,
  activeMonths
) => {
  return activeMonths ? totalTransactions / activeMonths : 0;
};

const findMostInteractedContract = (transactions, userAddress) => {
  if (!transactions) return { address: "N/A", count: 0 };
  const contractInteractionCounts = {};

  transactions.forEach((transaction) => {
    const { to } = transaction;

    if (to && to !== userAddress) {
      if (!contractInteractionCounts[to]) {
        contractInteractionCounts[to] = 0;
      }
      contractInteractionCounts[to]++;
    }
  });

  const mostInteractedContract = Object.keys(contractInteractionCounts).reduce(
    (a, b) =>
      contractInteractionCounts[a] > contractInteractionCounts[b] ? a : b,
    "N/A"
  );

  return {
    address: mostInteractedContract,
    count: contractInteractionCounts[mostInteractedContract] || 0,
  };
};

const findApprovalTransactions = (transactions) => {
  if (!transactions || transactions.length === 0) return [];
  return transactions.filter((transaction) =>
    transaction.functionName?.includes("approve")
  );
};

const calculateApprovalRate = (approvalTransactions, totalTransactions) => {
  if (!approvalTransactions || !totalTransactions) return 0;
  return approvalTransactions.length / totalTransactions;
};

const calculateTotalTransactions = (transactions) => {
  return transactions ? transactions.length : 0;
};

const findMaxMinTransaction = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {
      maxTransaction: null,
      maxVolume: 0,
    };
  }

  let maxValueUSD = -Infinity;
  let maxVolume = 0;
  let maxTransaction = null;

  transactions.forEach((transaction) => {
    const mainValueUSD = parseFloat(transaction.valueUSD);
    if (!isNaN(mainValueUSD) && mainValueUSD !== 0) {
      if (mainValueUSD > maxValueUSD) {
        maxValueUSD = mainValueUSD;
        maxTransaction = transaction;
      }
      if (mainValueUSD > maxVolume) {
        maxVolume = mainValueUSD;
      }
    }

    if (transaction.transfers && transaction.transfers.length > 0) {
      transaction.transfers.forEach((transfer) => {
        const transferValueUSD = parseFloat(transfer.valueUSD);
        if (!isNaN(transferValueUSD) && transferValueUSD !== 0) {
          if (transferValueUSD > maxValueUSD) {
            maxValueUSD = transferValueUSD;
            maxTransaction = { ...transaction, ...transfer };
          }
          if (transferValueUSD > maxVolume) {
            maxVolume = transferValueUSD;
          }
        }
      });
    }
  });

  return {
    maxTransaction,
    maxVolume,
  };
};

export {
  calculateAverageFee,
  calculateAverageVolume,
  calculateApprovalRate,
  findApprovalTransactions,
  calculateContractToNftRatio,
  calculateDailyTransactionAverage,
  calculateMonthlyTransactionAverage,
  findMostInteractedContract,
  calculateTotalTransactions,
  findMaxMinTransaction,
};
