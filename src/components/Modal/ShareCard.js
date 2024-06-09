import React, { useContext, useEffect, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ThemeContext } from "../../redux/ThemeContext";
import { DownloadImage, renderShort } from "../../utils/Other";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function ShareCard({
  modalOpen,
  handleModalClose,
  networkData,
  addressFromUrl,
  selectedNetwork,
}) {
  const { theme } = useContext(ThemeContext);

  const printRef = useRef();
  const pageStyle = {
    backgroundColor: theme === "dark" ? "#18181b" : "white",
    color: theme === "dark" ? "white" : "black",
  };

  const [isHideBalance, setIsHideBalance] = useState(false);

  const [activeAccount, setActiveAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [bridge, setBridge] = useState(null);
  const [contract, setContract] = useState(null);
  const [fees, setFees] = useState(null);
  const [interactions, setInteractions] = useState(null);
  const [mint, setMint] = useState(null);
  const [volume, setVolume] = useState(null);

  useEffect(() => {
    if (networkData) {
      setActiveAccount(networkData.ActiveAccount);
      setBalance(networkData?.Balance);
      setBridge(networkData?.Bridge);
      setContract(networkData?.Contract);
      setFees(networkData?.Fees);
      setInteractions(networkData?.Interactions);
      setMint(networkData?.NFTMint);
      setVolume(networkData?.Volume);
    }
  }, [networkData]);

  const handleHideBalance = () => {
    setIsHideBalance(!isHideBalance);
  };

  const handleDownloadImage = () => {
    if (modalOpen) {
      DownloadImage(printRef.current, theme);
    }
  };

  return (
    <Transition.Root show={modalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="absolute  inset-0 flex items-center justify-center z-50   "
        open={modalOpen}
        onClose={handleModalClose}
      >
        <div
          className="fixed inset-0 opacity-80 bg-black "
          aria-hidden="true"
        />

        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            style={pageStyle}
            className=" rounded-lg p-2 w-full lg:w-1/2  relative"
          >
            <Dialog.Title as="h3" className="text-lg font-bold mb-2 ">
              Share Card
            </Dialog.Title>
            <div
              ref={printRef}
              className={`p-2 rounded-lg  border-dashed border-4  ${
                theme === "light"
                  ? "border-gray-300 "
                  : "border-gray-600 text-gray-300"
              } `}
            >
              <div className="flex flex-col ">
                <div className="flex justify-between ">
                  <span className="text-[9px] md:text-xs font-bold text-center mb-5 text-gray-500  ">
                    zkcodex.com
                  </span>

                  <span className="blanka text-center mb-6 font-extrabold text-sm md:text-lg  bg-clip-text bg-gradient-to-r drop-shadow-2xl ">
                    ZKCODEX
                  </span>

                  <span className="text-[9px] md:text-xs font-bold text-center mb-5 text-gray-500">
                    {renderShort(addressFromUrl)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center  my-2  ">
                <span className="text-xs md:text-sm font-bold text-center mb-5 underline underline-offset-8">
                  Active Account
                </span>
                <div className="flex justify-evenly text-[10px] md:text-xs ">
                  <span className="">{activeAccount?.lastTX}</span>
                  <span className="">{activeAccount?.activeDay} day</span>
                  <span className="">{activeAccount?.activeWeek} weeks</span>
                  <span className="">{activeAccount?.activeMonth} months</span>
                </div>
              </div>

              <div
                className={` md:text-center text-left p-2 rounded-lg   ${
                  theme === "light"
                    ? "border-gray-300 "
                    : "border-gray-600 text-gray-300"
                }`}
              >
                <hr
                  className={` ${
                    theme === "light"
                      ? "border-gray-300 "
                      : "border-gray-600 text-gray-300"
                  }`}
                />

                <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 items-start mt-5">
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-sm mb-1 font-bold">Volume</span>
                    {volume?.volumeUSD && (
                      <span className="text-xs ">
                        {volume?.volumeUSD.toFixed(2) || "-"} $
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-sm mb-1 font-bold">Interactions</span>
                    {interactions?.interactions ? (
                      <span className="text-xs ">
                        {interactions?.interactions || "-"}
                      </span>
                    ) : (
                      <span className="text-[9px]">-</span>
                    )}
                  </div>

                  <div className="flex flex-col justify-center md:items-center">
                    <span className="text-sm mb-1 font-bold">Fee</span>
                    {fees?.feeUSD ? (
                      <span className="text-xs ">
                        {fees?.feeUSD?.toFixed(2) || "-"} $
                      </span>
                    ) : (
                      <span className="text-[9px]">-</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-sm mb-1 font-bold">
                      Bridge Deposit V.
                    </span>
                    <span className="flex justify-start md:justify-between gap-5">
                      {bridge?.volumeUSD ? (
                        <>
                          <span className="text-xs ">
                            {Number(bridge?.volumeUSD).toFixed(2)} ${" "}
                          </span>
                          <span className="text-xs ">Used: {bridge.count}</span>
                        </>
                      ) : (
                        <span className="text-[9px]">-</span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-xs mb-1 font-bold">
                      Contract Interactions
                    </span>
                    {contract?.uniqueContract ? (
                      <span className="text-xs ">
                        {contract?.uniqueContract}
                      </span>
                    ) : (
                      <span className="text-[9px]">-</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-xs mb-1 font-bold">NFT Mint</span>
                    {mint?.MintTokens ? (
                      <span className="text-xs ">{mint?.MintTokens}</span>
                    ) : (
                      <span className="text-[9px]">-</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center  md:items-center">
                    <span className="text-xs mb-1 font-bold">Balance</span>

                    <div className="flex justify-between items-center">
                      {isHideBalance ? (
                        <span className="text-xs ">
                          {balance?.usdValue?.toFixed(2)} $
                        </span>
                      ) : (
                        <span className="text-xs ">{"****"} </span>
                      )}
                      <span
                        className="ml-2 cursor-pointer"
                        onClick={() => handleHideBalance()}
                      >
                        {isHideBalance ? <VscEyeClosed /> : <VscEye />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-center gap-5">
              <button
                onClick={handleDownloadImage}
                className="bg-indigo-500 text-white px-3 py-1 mt-4 rounded w-full"
              >
                Download
              </button>
              {/* <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=Check out my zkCodex profile!&url=https://zkcodex.com/${selectedNetwork}/${addressFromUrl}`}
                className="bg-indigo-500 text-white px-3 py-1 mt-4 rounded w-full"
              >
                Share X
              </a> */}

              <div className="">
                <button
                  onClick={handleModalClose}
                  className="bg-red-500 text-white px-3 py-1 mt-4 rounded w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default ShareCard;
