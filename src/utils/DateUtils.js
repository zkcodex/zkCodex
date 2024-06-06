export const formatDate = (date) => {
  return date ? new Date(parseInt(date)).toLocaleString() : "";
};

export const activeAccount = (date) => {
  const currentDate = new Date();
  let secondsDiff = null;
  let minutesDiff = null;
  let hoursDiff = null;
  let daysDiff = null;
  let weeksDiff = null;
  let monthsDiff = null;

  if (date && !isNaN(date)) {
    const firstTransactionDate = new Date(parseInt(date));
    const timeDiff = Math.abs(
      currentDate.getTime() - firstTransactionDate.getTime()
    );
    secondsDiff = Math.ceil(timeDiff / 1000);
    minutesDiff = Math.ceil(timeDiff / (1000 * 60));

    hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    weeksDiff = Math.floor(daysDiff / 7);
    monthsDiff = Math.floor(daysDiff / 30);
  }

  return {
    secondsDiff,
    minutesDiff,
    hoursDiff,
    daysDiff,
    weeksDiff,
    monthsDiff,
  };
};

export function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const dayIndex = (date.getUTCDay() + 6) % 7;
  const daysSinceFirstDay = Math.floor(
    (date.getTime() - oneJan.getTime()) / 86400000
  );
  const weekIndex = Math.floor(
    (daysSinceFirstDay + oneJan.getUTCDay() - dayIndex) / 7
  );

  return weekIndex;
}

export function countAllTransactionPeriods(address, transactions) {
  const uniqueDays = new Set();
  const uniqueWeeks = new Set();
  const uniqueMonths = new Set();

  transactions.forEach((transaction) => {
    if (transaction.from.toLowerCase() !== address.toLowerCase()) return;

    const timestamp = new Date(transaction.timeStamp); // Unix zaman damgasını milisaniyeye çeviriyoruz
    const year = timestamp.getFullYear();
    const month = timestamp.getUTCMonth();
    const day = timestamp.getUTCDate();
    const week = getWeekNumber(timestamp);

    uniqueDays.add(`${year}-${month}-${day}`);
    uniqueWeeks.add(`${year}-${week}`);
    uniqueMonths.add(`${year}-${month}`);
  });

  return {
    days: uniqueDays.size,
    weeks: uniqueWeeks.size,
    months: uniqueMonths.size,
  };
}

export function countAllTransactionPeriodsZKSYNC(address, transactions) {
  const uniqueDays = new Set();
  const uniqueWeeks = new Set();
  const uniqueMonths = new Set();

  transactions.forEach((transaction) => {
    if (transaction.from.toLowerCase() !== address.toLowerCase()) return;

    const timestamp = new Date(transaction.receivedAt);
    const year = timestamp.getFullYear();
    const month = timestamp.getUTCMonth();
    const day = timestamp.getUTCDate();
    const week = getWeekNumber(timestamp);

    uniqueDays.add(`${year}-${month}-${day}`);
    uniqueWeeks.add(`${year}-${week}`);
    uniqueMonths.add(`${year}-${month}`);
  });

  return {
    days: uniqueDays.size,
    weeks: uniqueWeeks.size,
    months: uniqueMonths.size,
  };
}
export function countTransactionPeriods(
  address,
  transactions,
  protocol,
  addresses = []
) {
  const uniqueDays = new Set();
  const uniqueWeeks = new Set();
  const uniqueMonths = new Set();

  transactions.forEach((transaction) => {
    if (
      protocol !== "zksynceraportal" &&
      !addresses.includes(transaction.to.toLowerCase()) &&
      !addresses.includes(transaction.from.toLowerCase())
    )
      return;

    if (protocol === "zksynceraportal") {
      if (
        !transaction.data ||
        (!transaction.data.startsWith("0x51cff8d9") &&
          !(
            transaction.to.toLowerCase() === address.toLowerCase() &&
            transaction.isL1Originated
          ))
      )
        return;
    }
    const timestamp = new Date(transaction.receivedAt);
    const year = timestamp.getFullYear();
    const month = timestamp.getUTCMonth();
    const day = timestamp.getUTCDate();
    const week = getWeekNumber(timestamp);

    uniqueDays.add(`${year}-${month}-${day}`);
    uniqueWeeks.add(`${year}-${week}`);
    uniqueMonths.add(`${year}-${month}`);
  });

  return {
    days: uniqueDays.size,
    weeks: uniqueWeeks.size,
    months: uniqueMonths.size,
  };
}

export const getTimeAgoFirst = (date) => {
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (seconds < 60) {
    return Math.round(seconds) + " sec";
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return Math.round(minutes) + " min";
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return Math.round(hours) + " hour";
  }

  const days = hours / 24;
  return Math.round(days) + " day";
};

export const getTimeAgoFirstNoText = (date) => {
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (seconds < 60) {
    return Math.round(seconds);
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return Math.round(minutes);
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return Math.round(hours);
  }

  const days = hours / 24;
  return Math.round(days);
};

export const getTimeAgo = (date) => {
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (seconds < 60) {
    return (
      Math.round(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago"
    );
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return (
      Math.round(minutes) + " minute" + (minutes === 1 ? "" : "s") + " ago"
    );
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return Math.round(hours) + " hour" + (hours === 1 ? "" : "s") + " ago";
  }

  const days = hours / 24;
  return Math.round(days) + " day" + (days === 1 ? "" : "s") + " ago";
};
