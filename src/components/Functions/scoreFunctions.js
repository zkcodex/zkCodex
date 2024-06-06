import React, { useEffect, useMemo, useState } from "react";
import GaugeChart from "../Charts/GaugeScoreCard";
import { FiInfo } from "react-icons/fi";
import ScoreModal from "../Modal/ScoreModal";

function ScoreFunctionsOP({ networkData }) {
  const [totalScore, setTotalScore] = useState(0);

  const [scoreCategory, setScoreCategory] = useState("");

  const validateData = (data, defaultValue) => {
    return data && !isNaN(data) ? data : defaultValue;
  };

  const calculateTotalScore = async (data) => {
    if (!data || Object.keys(data).length === 0) {
      return { total: 0, details: {} };
    }
    let totalScore = 0;
    let details = {};

    const validations = {
      activeMonth: validateData(data.ActiveAccount?.activeMonth, 0),
      volumeUSD: validateData(data.Volume?.volumeUSD, 0),
      interactions: validateData(data.Interactions?.interactions, 0),
      uniqueContract: validateData(data.Contract?.uniqueContract, 0),
      bridgeVolumeUSD: validateData(data.Bridge?.volumeUSD, 0),
      bridgeCount: validateData(data.Bridge?.count, 0),
      balance: validateData(parseFloat(data.Balance?.balance), 0),
    };

    const rules = [
      { key: "activeMonth", threshold: [3, 6, 9], scorePerLevel: 10 },
      {
        key: "volumeUSD",
        threshold: [10000, 50000, 250000],
        scorePerLevel: 10,
      },
      { key: "interactions", threshold: [50, 100, 250], scorePerLevel: 5 },
      { key: "uniqueContract", threshold: [10, 50, 100], scorePerLevel: 5 },
      { key: "bridgeVolumeUSD", threshold: [100], scorePerLevel: 5 },
      { key: "bridgeCount", threshold: [2], scorePerLevel: 5 },
    ];

    rules.forEach((rule) => {
      const value = validations[rule.key];
      let score = 0;
      rule.threshold.forEach((threshold, index) => {
        if (value >= threshold) {
          score = (index + 1) * rule.scorePerLevel;
        }
      });
      totalScore += score;
      details[rule.key] = score;
    });

    const balanceScore = validations.balance >= 0.005 ? 0 : -10;
    totalScore += balanceScore;
    details["balance"] = balanceScore;

    setTotalScore(totalScore);

    if (totalScore >= 1 && totalScore <= 30) {
      setScoreCategory("Rookie");
    } else if (totalScore > 30 && totalScore <= 70) {
      setScoreCategory("Average");
    } else if (totalScore > 70) {
      setScoreCategory("Master");
    }

    return { total: totalScore, details };
  };

  useEffect(() => {
    calculateTotalScore(networkData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const criteria = useMemo(
    () => ({
      activeMonth: {
        name: "Active Months",
        description: "The number of months the user has been active.",
      },
      volumeUSD: {
        name: "Transactions Volume",
        description: "The user's volume.",
      },
      interactions: {
        name: "Interactions",
        description: "The number of interactions the user has made.",
      },
      uniqueContract: {
        name: "Contract Count",
        description:
          "The number of unique contracts the user has interacted with.",
      },
      bridgeCount: {
        name: "Native Bridge Volume and Count",
        description:
          "The number of transactions the user has made via the native bridge adapter and the total volume in USD.",
      },
      balance: {
        name: "ETH Balance",
        description: "User's ETH balance.",
      },
    }),
    []
  );

  return (
    <div className="flex  items-center px-1 relative">
      <span className="absolute top-0 right-0 z-50 mr-1 font-bold text-gray-700 cursor-pointer">
        <FiInfo onClick={toggleInfo} className="text-yellow-500" />
      </span>
      <ScoreModal criteria={criteria} isOpen={showInfo} onClose={toggleInfo} />
      <GaugeChart
        level={scoreCategory}
        score={totalScore}
        color="rgb(99 102 241)"
      />
    </div>
  );
}

export default ScoreFunctionsOP;
