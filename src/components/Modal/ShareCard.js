// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Transition, Dialog } from "@headlessui/react";
// import { ThemeContext } from "../../redux/ThemeContext";
// import { DownloadImage, renderShort } from "../../utils/Other";
// import { VscEye, VscEyeClosed } from "react-icons/vsc";
// import { getLeaderboardData } from "../../service/Zksync";

// function ShareCard({
//   modalOpen,
//   handleModalClose,
//   networkData,
//   addressFromUrl,
//   selectedNetwork,
// }) {
//   const { theme } = useContext(ThemeContext);

//   const printRef = useRef();
//   const pageStyle = {
//     backgroundColor: theme === "dark" ? "#18181b" : "white",
//     color: theme === "dark" ? "white" : "black",
//   };

//   const [isHideBalance, setIsHideBalance] = useState(false);

//   const handleDownloadImage = () => {
//     if (modalOpen) {
//       DownloadImage(printRef.current, theme);
//     }
//   };

//   return (
//     <Transition.Root show={modalOpen} as={React.Fragment}>
//       <Dialog
//         as="div"
//         className="absolute  inset-0 flex items-center justify-center z-50   "
//         open={modalOpen}
//         onClose={handleModalClose}
//       >
//         <div
//           className="fixed inset-0 opacity-80 bg-black "
//           aria-hidden="true"
//         />

//         <Transition.Child
//           as={React.Fragment}
//           enter="transition-opacity ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div
//             style={pageStyle}
//             className=" rounded-lg p-2 w-full lg:w-1/2  relative"
//           >
//             <Dialog.Title as="h3" className="text-lg font-bold mb-2 ">
//               Share Card
//             </Dialog.Title>
//             <div></div>
//             <div className="flex justify-between text-center gap-5">
//               <button
//                 onClick={handleDownloadImage}
//                 className="bg-indigo-500 text-white px-3 py-1 mt-4 rounded w-full"
//               >
//                 Download
//               </button>
//               {/* <a
//                 target="_blank"
//                 rel="noreferrer"
//                 href={`https://twitter.com/intent/tweet?text=Check out my zkCodex profile!&url=https://zkcodex.com/${selectedNetwork}/${addressFromUrl}`}
//                 className="bg-indigo-500 text-white px-3 py-1 mt-4 rounded w-full"
//               >
//                 Share X
//               </a> */}

//               <div className="">
//                 <button
//                   onClick={handleModalClose}
//                   className="bg-red-500 text-white px-3 py-1 mt-4 rounded w-full"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Transition.Child>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// export default ShareCard;
