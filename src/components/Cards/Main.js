import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";

import InteractionsCard from "./InteractionsCard";
import ContractCard from "./ContractCard";
import VolumeCard from "./VolumeCard";
import FeeCard from "./FeeCard";
import BalanceCard from "./BalanceCard";
import BridgeCard from "./BridgeCard";
import TokensCard from "./TokensCard";
import TokenList from "./TokenList";

import ProtocolsTable from "../Functions/protocols/ProtocolsTable";
import ActiveAccount from "./ActiveAccount";
import ChainSummary from "./ChainSummary";
import OptimismSimulation from "../Simulations";

import ScoreFunctionsOP from "../Functions/scoreFunctions";
import AnalysisCard from "./AnalysisCard";

function CardsPlus({ networkData, addressFromUrl }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-row items-center ">
        <ScoreFunctionsOP networkData={networkData} address={addressFromUrl} />
        <div className="w-full">
          <ActiveAccount ActiveAccount={networkData?.ActiveAccount} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ">
        <InteractionsCard
          title="Interactions"
          networkData={networkData}
          interactions={networkData.Interactions?.interactions}
          last7Days={networkData.Interactions?.last7Days}
        />

        <ContractCard
          uniqueContract={networkData.Contract?.uniqueContract}
          totalContract={networkData.Contract?.totalContract}
          last7Days={networkData.Contract?.last7Days}
        />

        <VolumeCard
          volumeETH={networkData.Volume?.volumeETH}
          volumeUSD={networkData.Volume?.volumeUSD}
          last7Days={networkData.Volume?.last7Days}
        />

        <FeeCard
          feeUSD={networkData.Fees?.feeUSD}
          feeETH={networkData.Fees?.feeETH}
          last7Days={networkData.Fees?.last7Days}
        />

        <BalanceCard
          usdValue={networkData?.Balance?.usdValue}
          balance={networkData?.Balance?.balance}
        />
        <BridgeCard
          count={networkData.Bridge?.count}
          volumeETH={networkData.Bridge?.volumeETH}
          volumeUSD={networkData.Bridge?.volumeUSD}
          last7Days={networkData.Bridge?.last7Days}
        />

        <TokensCard
          tokenUniqueCount={networkData?.Tokens?.tokenUniqueCount}
          nftUniqueCount={networkData?.Tokens?.nftUniqueCount}
        />
      </div>
      <AnalysisCard data={networkData} userAddress={addressFromUrl} />
      <ChainSummary networkData={networkData} theme={theme} />
      <OptimismSimulation networkData={networkData} theme={theme} />

      <TokenList networkData={networkData} theme={theme} />

      <ProtocolsTable
        address={addressFromUrl}
        transaction={networkData?.transactions}
      />
    </div>
  );
}

export default CardsPlus;
