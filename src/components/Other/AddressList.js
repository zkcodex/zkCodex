import React, { useContext } from "react";
import { FiX } from "react-icons/fi";

import { ThemeContext } from "../../redux/ThemeContext";

const AddressList = ({ addresses, onDeleteAddress, handleSubmit }) => {
  const { theme } = useContext(ThemeContext);

  const handleDeleteAddress = (address) => {
    onDeleteAddress(address);
  };

  return (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      <ul className=" w-full flex flex-col  outline-none text-[10px] sm:text-xs md:text-sm">
        {addresses?.map((item, index) => (
          <li
            className="flex justify-between md:justify-start items-center "
            key={index}
          >
            <span
              className={`flex  p-1 md:p-2 rounded-md justify-between items-center  cursor-pointer   ${
                theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
              }`}
              onClick={() => handleSubmit(item)}
            >
              {item}
            </span>
            <FiX
              className="text-red-500 cursor-pointer md:ml-3 w-5 h-5  hover:bg-red-400 hover:text-white rounded-full"
              onClick={() => handleDeleteAddress(item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
