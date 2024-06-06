import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import LoadingModal from "../components/Loading";
import { ThemeContext } from "../redux/ThemeContext";

import AddressLink from "../components/Other/AddressLink";

import MainSearch from "../components/Other/MainSearch";
import { fetchAllDataOP } from "../service/index";
import Main from "../components/Cards/Main";

function CheckPage() {
  const { address: paramAddress } = useParams();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const addressFromUrl = paramAddress || location.pathname.split("/")[1];

  const [networkData, setNetworkData] = useState(null);
  const [hasNftPass, setHasNftPass] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (addressFromUrl) {
      fetchNetworkData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressFromUrl]);

  const fetchNetworkData = async () => {
    try {
      setLoadingData(true);
      setError(null);
      setNetworkData(null);
      setHasNftPass(false);

      let data = null;

      data = await fetchAllDataOP(addressFromUrl);

      console.log(data);
      setNetworkData(data);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      setError(error);
    }
  };

  // const handleModalOpen = () => {
  //   setModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setModalOpen(false);
  // };

  // const handleRefresh = () => {
  //   fetchNetworkData();
  // };

  return (
    <div className=" min-h-screen">
      <MainSearch loadingData={loadingData} />
      {loadingData ? (
        <LoadingModal
          hasNft={hasNftPass}
          text="Loading"
          stateAddress={loadingData}
        />
      ) : error ? (
        <>
          <p className="text-center text-xl font-bold mt-10">
            Something went wrong. You may not have performed any transactions on
            this network.
          </p>
          <p className="text-center text-xl font-bold mt-10">
            Please try again
          </p>
        </>
      ) : networkData !== null ? (
        <>
          <div className="flex justify-between items-center my-2 gap-3 text-[9px] md:text-xs flex-col md:flex-row">
            <AddressLink addressFromUrl={addressFromUrl} theme={theme} />{" "}
            {/* <div className="flex items-center justify-between text-xs">
              <>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    className={`flex items-center border border-b-2  p-1 px-2 rounded-md cursor-pointer   ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Refresh
                    <FiRefreshCw size={12} className="ml-2" />
                  </button>

                  <button
                    onClick={handleModalOpen}
                    className={`flex items-center border border-b-2  p-1 px-2 rounded-md cursor-pointer   ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Share Card{" "}
                    <FiShare2
                      onClick={handleModalOpen}
                      className=" ml-2 cursor-pointer"
                    />
                  </button>
                </div>
                <ShareCard
                  addressFromUrl={addressFromUrl}
                  networkData={networkData}
                  modalOpen={modalOpen}
                  handleModalClose={handleModalClose}
                />
              </>
              )}
            </div> */}
          </div>

          <React.Fragment>
            <div className="my-4">
              <Main
                theme={theme}
                addressFromUrl={addressFromUrl}
                networkData={networkData}
              />
            </div>
          </React.Fragment>
        </>
      ) : (
        <LoadingModal text="Loading" stateAddress={loadingData} />
      )}
    </div>
  );
}

export default CheckPage;
