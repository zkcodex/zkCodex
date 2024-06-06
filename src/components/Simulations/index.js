import React, { useContext, useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiX } from "react-icons/fi";
import { getEthTransactions } from "../../service/api";
import { ThemeContext } from "../../redux/ThemeContext";
import { TiTick } from "react-icons/ti";

const Optimism = ({ networkData, addressFromUrl, selectedNetwork }) => {
  const { theme } = useContext(ThemeContext);

  const [
    differentDaysMainnetOPMainnetUser,
    setDifferentDaysMainnetOPMainnetUser,
  ] = useState(0);
  const [
    differentWeeksMainnetRepeatOPMainnetUsers,
    setDifferentWeeksMainnetRepeatOPMainnetUsers,
  ] = useState(0);

  const [bridgeThenTx, setBridgeThenTx] = useState(null);

  const [daoVoters, setDaoVoters] = useState(false);
  const [multiSigSigners, setMultiSigSigners] = useState(false);
  const [gitcoinDonors, setGitcoinDonors] = useState(false);

  let bridgeAddress = networkData?.Bridge?.BRIDGE_ADDRESS;
  const bridgeMainnet = networkData.Bridge?.count;

  const calculateBridgeUsersPricedOutofEthereum = async () => {
    try {
      const data = await getEthTransactions(addressFromUrl);
      if (data.transactions) {
        bridgeAddress = bridgeAddress.toLowerCase();

        const bridgeTransactions = data.transactions.filter(
          (transaction) => transaction.to === bridgeAddress
        );

        if (bridgeTransactions.length === 0) return false;

        // Get the date of the first bridge transaction
        const firstBridgeTransaction = bridgeTransactions[0];
        const firstBridgeTransactionDate = new Date(
          firstBridgeTransaction.timestamp * 1000
        );

        // Filter transactions that occurred after the bridge transaction
        const nonBridgeTransactions = data.transactions.filter(
          (transaction) => transaction.to !== bridgeAddress
        );

        let latestTransaction = new Date(0);

        for (const transaction of nonBridgeTransactions) {
          const transactionDate = new Date(transaction.timestamp * 1000);
          if (transactionDate > firstBridgeTransactionDate) {
            latestTransaction =
              transactionDate > latestTransaction
                ? transactionDate
                : latestTransaction;
          }
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  useEffect(() => {
    setDifferentDaysMainnetOPMainnetUser(
      networkData?.ActiveAccount?.activeDay || 0
    );
    setDifferentWeeksMainnetRepeatOPMainnetUsers(
      networkData?.ActiveAccount?.activeWeek || 0
    );
    calculateBridgeUsersPricedOutofEthereum().then((result) =>
      setBridgeThenTx(result)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkData, addressFromUrl]);

  const categoryPoints = {
    "OP Mainnet Users": 776.86,
    "Repeat OP Mainnet Users": 1692.49,
    "DAO Voters": 271.83,
    "Multisig Signers": 1190.26,
    "Gitcoin Donors (on L1)": 555.92,
    "Users Priced Out of Ethereum": 409.42,
  };

  const airdropBonusValues = [0, 4180.54, 13330.16, 27534.98];
  function calculateAirdropAmount(numCategoriesMet) {
    let airdropBonus = 0;

    if (numCategoriesMet === 4) {
      airdropBonus = airdropBonusValues[1];
    } else if (numCategoriesMet === 5) {
      airdropBonus = airdropBonusValues[2];
    } else if (numCategoriesMet === 6) {
      airdropBonus = airdropBonusValues[3];
    }

    let totalAirdrop = 0;

    if (OPMAINNETUSERS["OP Mainnet Users"]) {
      totalAirdrop += categoryPoints["OP Mainnet Users"];
    }
    if (REPEATOPMAINNETUSERS["Repeat OP Mainnet Users"]) {
      totalAirdrop += categoryPoints["Repeat OP Mainnet Users"];
    }
    if (DAOVOTERS["DAO Voters"]) {
      totalAirdrop += categoryPoints["DAO Voters"];
    }
    if (MULTISIGSIGNERS["Multisig Signers"]) {
      totalAirdrop += categoryPoints["Multisig Signers"];
    }
    if (GITCOINDONORS["Gitcoin Donors (on L1)"]) {
      totalAirdrop += categoryPoints["Gitcoin Donors (on L1)"];
    }
    if (USERSPRICEDOUTOFETHEREUM["Users Priced Out of Ethereum"]) {
      totalAirdrop += categoryPoints["Users Priced Out of Ethereum"];
    }

    if (OPMAINNETUSERS) {
      totalAirdrop += airdropBonus;
    }

    return totalAirdrop.toFixed(2);
  }

  const OPMAINNETUSERS = calcuateOPMainnetUsers();

  function calcuateOPMainnetUsers() {
    if (bridgeMainnet >= 1 || differentDaysMainnetOPMainnetUser >= 2) {
      return {
        "OP Mainnet Users": true,
        reward: categoryPoints["OP Mainnet Users"],
      };
    } else {
      return {
        "OP Mainnet Users": false,
        reward: 0,
      };
    }
  }

  const REPEATOPMAINNETUSERS = calcuateRepeatOPMainnetUsers();

  function calcuateRepeatOPMainnetUsers() {
    if (differentWeeksMainnetRepeatOPMainnetUsers >= 4) {
      return {
        "Repeat OP Mainnet Users": true,
        reward: categoryPoints["Repeat OP Mainnet Users"],
      };
    } else {
      return {
        "Repeat OP Mainnet Users": false,
        reward: 0,
      };
    }
  }

  const DAOVOTERS = calcuateDAOVoters();

  function calcuateDAOVoters() {
    if (daoVoters) {
      return {
        "DAO Voters": true,
        reward: categoryPoints["DAO Voters"],
      };
    } else {
      return {
        "DAO Voters": false,
        reward: 0,
      };
    }
  }

  const MULTISIGSIGNERS = calcuateMultisigSigners();

  function calcuateMultisigSigners() {
    if (multiSigSigners) {
      return {
        "Multisig Signers": true,
        reward: categoryPoints["Multisig Signers"],
      };
    } else {
      return {
        "Multisig Signers": false,
        reward: 0,
      };
    }
  }

  const GITCOINDONORS = calcuateGitcoinDonors();

  function calcuateGitcoinDonors() {
    if (gitcoinDonors) {
      return {
        "Gitcoin Donors (on L1)": true,
        reward: categoryPoints["Gitcoin Donors (on L1)"],
      };
    } else {
      return {
        "Gitcoin Donors (on L1)": false,
        reward: 0,
      };
    }
  }

  const USERSPRICEDOUTOFETHEREUM = calcuateUsersPricedOutofEthereum();

  function calcuateUsersPricedOutofEthereum() {
    if (bridgeThenTx) {
      return {
        "Users Priced Out of Ethereum": true,
        reward: categoryPoints["Users Priced Out of Ethereum"],
      };
    } else {
      return {
        "Users Priced Out of Ethereum": false,
        reward: 0,
      };
    }
  }
  const numCategoriesMet =
    OPMAINNETUSERS["OP Mainnet Users"] +
    REPEATOPMAINNETUSERS["Repeat OP Mainnet Users"] +
    DAOVOTERS["DAO Voters"] +
    MULTISIGSIGNERS["Multisig Signers"] +
    GITCOINDONORS["Gitcoin Donors (on L1)"] +
    USERSPRICEDOUTOFETHEREUM["Users Priced Out of Ethereum"];

  const totalAirdrop = calculateAirdropAmount(
    OPMAINNETUSERS["OP Mainnet Users"] +
      REPEATOPMAINNETUSERS["Repeat OP Mainnet Users"] +
      DAOVOTERS["DAO Voters"] +
      MULTISIGSIGNERS["Multisig Signers"] +
      GITCOINDONORS["Gitcoin Donors (on L1)"] +
      USERSPRICEDOUTOFETHEREUM["Users Priced Out of Ethereum"]
  );

  const isEligible =
    OPMAINNETUSERS["OP Mainnet Users"] ||
    REPEATOPMAINNETUSERS["Repeat OP Mainnet Users"] ||
    DAOVOTERS["DAO Voters"] ||
    MULTISIGSIGNERS["Multisig Signers"] ||
    GITCOINDONORS["Gitcoin Donors (on L1)"] ||
    USERSPRICEDOUTOFETHEREUM["Users Priced Out of Ethereum"];

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`my-4 p-2 px-4 text-xs border rounded-md shadow-md
 ${theme === "light" ? "border-gray-300 " : "border-gray-600 text-gray-300"}
`}
      >
        <div className="flex justify-normal  items-center font-semibold">
          <div className="text-md p-2 flex flex-col w-full">
            <div className="flex justify-between items-center mb-2 w-full  gap-2 mr-5">
              <h1 className="text-lg lg:text-xl text-red-600 font-bold">
                Optimism Simulation
              </h1>
              <button
                onClick={toggleOpen}
                className="border p-2 rounded-full text-sm ml-5 font-bold"
              >
                {isOpen ? <FiArrowUp /> : <FiArrowDown />}
              </button>
            </div>
            {isOpen && (
              <div className="flex  flex-col lg:flex-row text-xs ">
                <div className="flex flex-col md:flex-row mr-5  w-full gap-2 ">
                  <div className="mb-4 w-full flex-col flex gap-1">
                    <div
                      className={`flex justify-between items-center border rounded-md p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">or</span>
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3
                                className={`
                            ${
                              bridgeMainnet >= 1
                                ? "text-[#10B981]"
                                : "text-gray-600"
                            }
                          `}
                              >
                                OP Mainnet Users: Bridged funds into Native
                                Bridge
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3
                                className={`
                            ${
                              differentDaysMainnetOPMainnetUser >= 2
                                ? "text-[#10B981]"
                                : "text-gray-600"
                            }
                          `}
                              >
                                Transaction on at least 2 different days
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4>
                        {bridgeMainnet >= 1 ||
                        differentDaysMainnetOPMainnetUser >= 2 ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </h4>
                    </div>

                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${
                          differentWeeksMainnetRepeatOPMainnetUsers >= 4
                            ? "text-[#10B981]"
                            : "text-gray-600"
                        }
                      `}
                        >
                          Repeat OP Mainnet Users: Transaction on at least 4
                          different weeks
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <h4>
                          {differentWeeksMainnetRepeatOPMainnetUsers >= 4 ? (
                            <TiTick className="text-[#10B981]" size={14} />
                          ) : (
                            <FiX className="text-red-600" size={14} />
                          )}
                        </h4>
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${bridgeThenTx ? "text-[#10B981]" : "text-gray-600"}
                      `}
                        >
                          Ethereum Mainnet: Bridge to another chain and perform
                          transactions on Ethereum to stay connected
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <h4>
                          {bridgeThenTx ? (
                            <TiTick className="text-[#10B981]" size={14} />
                          ) : (
                            <FiX className="text-red-600" size={14} />
                          )}
                        </h4>
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${daoVoters ? "text-[#10B981]" : "text-gray-600"}
                      `}
                        >
                          DAO Voters: Use at least 5 votes in Governor Alpha and
                          Bravo, Aave, Curve, Maker, Aragon, DAOHaus, DAOStack
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          onChange={(e) => setDaoVoters(e.target.checked)}
                        />
                        {daoVoters ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${multiSigSigners ? "text-[#10B981]" : "text-gray-600"}
                      `}
                        >
                          Multi-Sig Signers: Perform at least 10 transactions
                          with a MultiSig wallet
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          onChange={(e) => setMultiSigSigners(e.target.checked)}
                        />
                        {multiSigSigners ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${gitcoinDonors ? "text-[#10B981]" : "text-gray-600"}
                      `}
                        >
                          Gitcoin Donors (on L1): Make Gitcoin donations on L1
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          onChange={(e) => setGitcoinDonors(e.target.checked)}
                        />
                        {gitcoinDonors ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>

                    <h1 className="my-2 font-bold text-sm">
                      Bonus Eligibility
                    </h1>
                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${
                          numCategoriesMet >= 4
                            ? "text-[#10B981]"
                            : "text-gray-600"
                        }
                      `}
                        >
                          4 Categories & OP Mainnet User
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        {numCategoriesMet >= 4 ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${
                          numCategoriesMet >= 5
                            ? "text-[#10B981]"
                            : "text-gray-600"
                        }
                      `}
                        >
                          5 Categories & OP Mainnet User
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        {numCategoriesMet >= 5 ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between border rounded-md  p-1
                  ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
                    >
                      <div>
                        <h3
                          className={`
                        ${
                          numCategoriesMet >= 6
                            ? "text-[#10B981]"
                            : "text-gray-600"
                        }
                      `}
                        >
                          6 Categories & OP Mainnet User
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        {numCategoriesMet >= 6 ? (
                          <TiTick className="text-[#10B981]" size={14} />
                        ) : (
                          <FiX className="text-red-600" size={14} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-spacing-1 md:border-l-2 md:mx-5 my-5 border-t-2 border-gray-500"></div>
                  <div className="flex flex-col w-full justify-between">
                    <div className="flex flex-col  w-full gap-5 mr-5 text-base ">
                      <div className="flex gap-5 items-center">
                        <h1 className="text-sm lg:text-base ">
                          {isEligible ? (
                            <span className="bg-green-500 rounded-md text-white p-1 px-2">
                              Eligible
                            </span>
                          ) : (
                            <span className="bg-red-500 rounded-md text-white p-1 px-2">
                              Not Eligible
                            </span>
                          )}
                        </h1>
                        <h1 className="text-sm lg:text-base">
                          {totalAirdrop >= 4180.54 && (
                            <span className="bg-green-500 rounded-md text-white p-1 px-2">
                              Bonus Eligible
                            </span>
                          )}
                        </h1>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <span className="font-bold ">
                          Total Reward :{" "}
                          <span className="text-yellow-500">
                            {totalAirdrop}
                          </span>{" "}
                        </span>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <span className="font-bold">
                          Points :{" "}
                          <span className="text-yellow-500">
                            {numCategoriesMet}
                          </span>{" "}
                        </span>
                      </div>

                      <a
                        href={`https://app.rhino.fi/bridge?refId=PG_zkCodex&network=${selectedNetwork}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 text-xs md:text-base mt-5 hover:underline underline-offset-2 font-semibold"
                      >
                        Bridge to {selectedNetwork} to build up your activity
                      </a>
                    </div>

                    <a
                      href="https://community.optimism.io/docs/governance/airdrop-1/#op-mainnet-early-adopters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 mt-5 text-[9px] md:text-sm hover:underline underline-offset-2 font-semibold"
                    >
                      Optimism Docs
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Optimism;
