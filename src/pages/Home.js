import React, { useContext, useEffect, useRef } from "react";
import LogoSVG from "../assets/logo/opt-logo";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddressList from "../components/Other/AddressList";
import { ThemeContext } from "../redux/ThemeContext";


function Home() {
  const [addressInput, setAddressInput] = React.useState();
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = React.useState(false);
  const [localAddress, setLocalAddress] = React.useState([]);
  const [inputClicked, setInputClicked] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);

  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setIsShow(true);
  };
  const navigate = useNavigate();

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
    if (addressInput === "" || addressInput === undefined) {
      toast.error("Please enter a valid address or ENS name", {
        duration: 2000,
      });
      return;
    }

    if (addressInput.includes(".eth")) {
      let addressResolved = await fetchEnsName(addressInput);
      if (addressResolved.status === 200) {
        navigate(`/${addressResolved.name}`);
      }
    } else if (addressInput.includes("0x") && addressInput.length === 42) {
      navigate(`/${addressInput}`);
    } else {
      toast.error("Please enter a valid address or ENS name", {
        duration: 2000,
      });
    }

    if (
      !localAddress.includes(addressInput) &&
      addressInput.includes("0x") &&
      addressInput.length === 42
    ) {
      const updatedLocalAddress = [...localAddress, addressInput];
      localStorage.setItem("address", JSON.stringify(updatedLocalAddress));
      setLocalAddress(updatedLocalAddress);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("address");
    if (data) {
      setLocalAddress(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full  gap-4 mt-20 p-4 sm:p-2">
      <LogoSVG theme={theme} />

      <div
        className={`flex w-full sm:w-2/3 justify-between  p-1  rounded-lg my-2  sm:border ${
          theme === "light" ? "border-gray-300" : "border-gray-600"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center  gap-2 justify-center w-full ">
          <input
            ref={inputRef}
            onFocus={handleInputFocus}
            type="text"
            placeholder="
              Enter Address or ENS Name"
            className={`py-1.5 text-center px-4  w-full  xl:w-5/6 rounded-md text-xs md:text-sm outline-none font-semibold border sm:border-none ${
              theme === "light"
                ? "border-gray-200"
                : "bg-transparent border-gray-600"
            }`}
            value={addressInput}
            onClick={() => setInputClicked(true)}
            onChange={(e) => setAddressInput(e.target.value)}
          />
          <button
            disabled={loading}
            className={`w-full font-bold md:w-40 text-white  py-1.5 px-4 text-xs md:text-sm rounded-md shadow-md  bg-red-600 ${
              theme === "light"
                ? "border-gray-200 hover:bg-gray-300 text-gray-700"
                : "hover:bg-red-700  "
            }`}
            onClick={handleScanClick}
          >
            {loading ? (
              <div className="flex justify-center">
                <div
                  className={` animate-spin rounded-full h-4 w-4 border-t-2 border-l-2
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
  );
}

export default Home;
