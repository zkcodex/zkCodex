import React, { useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";
import Loading from "../../assets/Loading";

function LoadingModal({ stateAddress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="fixed top-1/4 left-1/4 right-1/4 bottom-1/4 flex  items-center justify-center  z-50">
      <div className="absolute inset-0   opacity-40"></div>
     
        <div className="flex items-center justify-center ">
         <Loading
         theme={theme}
          />
     
      </div>
    </div>
  );
}

export default LoadingModal;
