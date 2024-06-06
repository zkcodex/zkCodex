// import React, { useContext } from "react";
// import { socialLinks } from "../../utils/ChainsSocial";
// import { ThemeContext } from "../../redux/ThemeContext";

// const SocialLinks = ({ chain }) => {
//   const { theme } = useContext(ThemeContext);
//   const allLinks = socialLinks[0][chain] || [];
// //   const [showMore, setShowMore] = useState(false);

//   // Twitter ve Discord linklerini filtreleme
//   const mainLinks = allLinks.filter(
//     (link) =>
//     link.name === "website" ||
//       link.name === "x" ||
//       link.name === "discord" ||
//       link.name === "telegram" ||
//       link.name === "galxe"
//   );

//   //   // Diğer linkler
//   //   const moreLinks = allLinks.filter(
//   //     (link) => link.name !== "x" && link.name !== "discord"
//   //   );

//   return (
//     <div
//       className={`flex  justify-end gap-2 border p-1 my-2 rounded-md text-xs 
//         ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
//       `}
//     >
//       {mainLinks
//         .filter((link) => link?.link)
//         .map((link, index) => (
//           <div className="flex items-end" key={index}>
//             <a
//               href={link?.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="first-letter:uppercase"
//             >
//               {link.link && (
//                 <img
//                   src={require(`../../assets/ico/${link?.name}.png`)}
//                   alt={link?.name}
//                   className="h-5 w-5 rounded-md text-white"
//                 />
//               )}
//             </a>
//           </div>
//         ))}
//       {/* {showMore &&
//         moreLinks.map((link, index) => (
//           <div className="flex items-end" key={index}>
//             <a
//               href={link.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="first-letter:uppercase"
//             >
//               <img
//                 src={require(`../../assets/social/${link.name}.js`)}
//                 alt={link.name}
//                 className="h-5 w-5 rounded-md text-white"
//               />
//             </a>
//           </div>
//         ))}

//       {moreLinks.length > 0 && (
//         <button
//           onClick={() => setShowMore(!showMore)}
//           className={`text-xs ${
//             theme === "dark" ? "text-white" : "text-black"
//           }`}
//         >
//           {showMore ? "Less" : "More"}
//         </button>
//       )} */}
//     </div>
//   );
// };

// export default SocialLinks;
