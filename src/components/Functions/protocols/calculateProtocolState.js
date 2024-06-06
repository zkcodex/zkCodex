// calculateProtocolState.js
import { countTransactionPeriods } from "../../../utils/DateUtils"
import { protocols } from "./protocolsData";

export const calculateProtocolState = (transactions, address) => {
  const result = protocols.map((protocol) => {
    const protocolState = {
      name: protocol.name,
      id: protocol.id,
      lastActivity: "",
      volume: 0,
      fees: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: protocol.url,
    };

    transactions.forEach((transaction) => {
      if (
        protocol.addresses.includes(transaction?.to?.toLowerCase()) ||
        protocol.addresses.includes(transaction?.from?.toLowerCase())
      ) {
        const transactionTimestamp = new Date(transaction.timeStamp);
        if (
          !protocolState.lastActivity ||
          transactionTimestamp > new Date(protocolState.lastActivity)
        ) {
          protocolState.lastActivity = transactionTimestamp;
        }
        protocolState.interactions += 1;
        protocolState.fees += transaction.fee;

        if (transaction.transfers && transaction.transfers.length > 0) {
          const firstTransfer = transaction.transfers[0]; 
          const transferValueUSD = parseFloat(firstTransfer.valueUSD);

          if (!isNaN(transferValueUSD)) {
            protocolState.volume += transferValueUSD;
          }
        } else {
          const transactionValue = parseFloat(transaction.valueUSD || 0);
          if (!isNaN(transactionValue)) {
            protocolState.volume += transactionValue;
          }
        }
      }
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      protocol.addresses
    ).days;

    return protocolState;
  });

  return result;
};
