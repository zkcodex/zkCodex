import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../redux/ThemeContext";

import toast from "react-hot-toast";
import { ethers } from "ethers";
import AddressList from "./AddressList";

function MainSearch({ loadingData }) {
  const [addressInput, setAddressInput] = useState("");
  const [localAddress, setLocalAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef(null);
  const [inputClicked, setInputClicked] = useState(false);

  const handleInputFocus = () => {
    setIsShow(true);
  };

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const fetchEnsName = async (address) => {
    try {
      setLoading(true);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/0106e98e8d674225aba24142f6552258"
      );
      const name = await provider.resolveName(address);
      if (!name) {
        toast.error("Invalid ENS name: Name not found", { duration: 2000 });
        return { status: 404 }; // Not Found
      }
      setLoading(false);
      return {
        name,
        status: 200,
      };
    } catch (error) {
      setLoading(false);
      console.error("Error resolving ENS name:", error.message);
      toast.error("Error resolving ENS name - API ERROR", { duration: 2000 });
      return {
        status: 500, // Internal Server Error
      };
    }
  };
  const handleScanClick = async () => {
    console.log(addressInput);
    if (!addressInput) {
      toast.error("Please enter a valid address or ENS name", {
        duration: 2000,
      });
      return;
    }
  
    if (addressInput.endsWith('.eth')) {
      let addressResolved = await fetchEnsName(addressInput);
      if (addressResolved.status === 200) {
        navigate(`/${addressResolved.name}`);
      }
    } else if (ethers.utils.isAddress(addressInput)) {
      if (!localAddress.includes(addressInput)) {
        const updatedLocalAddress = [...localAddress, addressInput];
        localStorage.setItem("address", JSON.stringify(updatedLocalAddress));
        setLocalAddress(updatedLocalAddress);
      }
      navigate(`/${addressInput}`);
    } else {
      toast.error("Please enter a valid address or ENS name", {
        duration: 2000,
      });
    }
  };
  

  useEffect(() => {
    const data = localStorage.getItem("address");
    if (data) {
      setLocalAddress(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex flex-col max-h-screen">
      <div className="">
        <div
          className={`flex flex-col justify-between relative flex-1  p-1  rounded-lg my-2 ${
            theme === "light" ? "border-gray-300" : "border-gray-600"
          }`}
        >
          <div className="flex flex-1 flex-col md:flex-row items-center  gap-2 justify-center">
            <input
              disabled={loading || loadingData}
              ref={inputRef}
              onFocus={handleInputFocus}
              type="text"
              placeholder="
              Enter Address or ENS Name"
              className={`py-1.5 text-center px-4 border w-full  xl:w-3/5 rounded-md shadow-md text-xs md:text-sm outline-none font-semibold ${
                theme === "light"
                  ? "border-gray-200"
                  : "bg-transparent border-gray-600"
              }`}
              value={addressInput}
              onClick={() => setInputClicked(true)}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              disabled={loading || loadingData}
              className={`w-full md:w-32 border py-1.5 px-4 text-xs md:text-sm rounded-md shadow-md font-semibold ${
                theme === "light"
                  ? "border-gray-200 hover:bg-gray-300 text-gray-700"
                  : "hover:bg-gray-600 bg-transparent border-gray-600"
              }`}
              onClick={handleScanClick}
            >
              {loading || loadingData ? (
                <div className="flex justify-center">
                  <div
                    className={` animate-spin rounded-full h-5 w-5 border-t-2 border-l-2
                ${theme === "light" ? "border-gray-200" : "border-gray-600"}
            
            `}
                  ></div>
                </div>
              ) : (
                "Scan"
              )}
            </button>
          </div>
          <span>
            {inputClicked && isShow && (
              <AddressList
                inputRef={inputRef}
                isShow={isShow}
                setIsShow={setIsShow}
                addressFromUrl={addressInput}
                setAddressFromUrl={setAddressInput}
                setInputClicked={setInputClicked}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MainSearch;
