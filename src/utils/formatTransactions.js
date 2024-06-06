export const formatTokenTX = (tokenTX) => {
  return tokenTX.map((tx) => ({
    hash: String(tx.hash).toLowerCase(),
    from: String(tx.from).toLowerCase(),
    to: String(tx.to).toLowerCase(),
    timeStamp: Number(tx.timeStamp),
    tokenName: tx.tokenName,
    tokenSymbol: tx.tokenSymbol,
    tokenDecimal: Number(tx.tokenDecimal),
    contractAddress: tx.contractAddress,
    value: Number(tx.value),
  }));
};

export const formatTransactionTX = (transactions) => {
  return transactions.map((tx) => ({
    blockNumber: Number(tx.blockNumber),
    hash: String(tx.hash).toLowerCase(),
    from: String(tx.from).toLowerCase(),
    to: String(tx.to).toLowerCase(),
    timeStamp: Number(tx.timeStamp),
    value: tx.value,
    functionName: tx.functionName.toLowerCase(),
    status: tx.txreceipt_status && tx.txreceipt_status === "1",
    fee: (Number(tx.gasUsed) * Number(tx.gasPrice)) / 10 ** 18,
    input: tx.input,
    transfers: [],
  }));
};
