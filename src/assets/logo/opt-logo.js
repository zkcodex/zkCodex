import React from "react";

function LogoSVG(prop) {
  //   const { theme } = React.useContext(ThemeContext);
  //   const svgStyle = {
  //     fill: theme === "light" ? "black" : "white", // Light tema için siyah, dark tema için beyaz doldurma rengi
  //     stroke: theme === "light" ? "black" : "", // Kenarlık (stroke) rengi
  //   };

  return (
    <svg
      width={prop.width ? prop.width : "240"}
      height={prop.height ? prop.height : "64"}
      viewBox="0 0 226 64"
      fill={prop.theme === "dark" ? "white" : "black"}
      xmlns="http://www.w3.org/2000/svg"
      //   className={`
      //         ${svgStyle.fill}
      //         ${svgStyle.stroke}
      //     `}
    >
      <rect x="32" y="38" width="194" height="14" rx="4" fill="#FF0420" />
      <g clip-path="url(#clip0_4_13) ">
        <path
          d="M32 0L33.8418 3.7784L36.1768 0.26521L37.4938 4.24418L40.2822 1.0563L41.0517 5.16775L44.2459 2.35974L44.4549 6.53331L48 4.15321L47.6448 8.3175L51.4803 6.40604L50.5672 10.4898L54.6274 9.07968L53.1718 13.013L57.3874 12.1284L55.4142 15.8441L59.7128 15.5L57.256 18.9343L61.5642 19.1368L58.6656 22.2312L62.9096 22.9766L59.6189 25.6779L63.7262 26.9537L60.0997 29.2158L64 31L60.0997 32.7842L63.7262 35.0463L59.6189 36.3221L62.9096 39.0234L58.6656 39.7688L61.5642 42.8632L57.256 43.0657L59.7128 46.5L55.4142 46.1559L57.3874 49.8716L53.1718 48.987L54.6274 52.9203L50.5672 51.5102L51.4803 55.594L47.6448 53.6825L48 57.8468L44.4549 55.4668L44.2459 59.6403L41.0517 56.8323L40.2822 60.9437L37.4938 57.7558L36.1768 61.7348L33.8418 58.2216L32 62L30.1582 58.2216L27.8232 61.7348L26.5062 57.7558L23.7178 60.9437L22.9483 56.8323L19.7541 59.6403L19.5451 55.4668L16 57.8468L16.3552 53.6825L12.5196 55.594L13.4328 51.5102L9.37258 52.9203L10.8282 48.987L6.61269 49.8716L8.58581 46.1559L4.28718 46.5L6.74406 43.0657L2.43586 42.8632L5.33445 39.7688L1.09037 39.0234L4.38109 36.3221L0.273765 35.0463L3.90029 32.7842L0 31L3.90029 29.2158L0.273765 26.9537L4.38109 25.6779L1.09037 22.9766L5.33445 22.2312L2.43586 19.1368L6.74406 18.9343L4.28718 15.5L8.58581 15.8441L6.61269 12.1284L10.8282 13.013L9.37258 9.07968L13.4328 10.4898L12.5196 6.40604L16.3552 8.3175L16 4.15321L19.5451 6.53331L19.7541 2.35974L22.9483 5.16775L23.7178 1.0563L26.5062 4.24418L27.8232 0.26521L30.1582 3.7784L32 0Z"
          fill="#FF0420"
        />
      </g>
      <path
        d="M69.792 44L72.768 25.12H66.848L67.584 20.64H84.224L83.488 25.12H77.568L74.592 44H69.792ZM83.8595 44L87.5715 20.64H95.0915C96.7555 20.64 98.1422 20.928 99.2515 21.504C100.382 22.08 101.193 22.9013 101.684 23.968C102.196 25.0347 102.334 26.2933 102.1 27.744C101.929 28.9387 101.534 30.0373 100.916 31.04C100.297 32.0213 99.5182 32.8427 98.5795 33.504C97.6622 34.1653 96.6382 34.6027 95.5075 34.816L96.1155 32.448L99.8595 44H94.8995L92.2755 35.168H90.0355L88.6275 44H83.8595ZM90.6755 31.008H93.4275C94.4942 31.008 95.3582 30.7413 96.0195 30.208C96.7022 29.6747 97.1182 28.928 97.2675 27.968C97.4382 26.9653 97.2675 26.1867 96.7555 25.632C96.2648 25.0773 95.4862 24.8 94.4195 24.8H91.6675L90.6755 31.008ZM101.767 44L111.207 20.64H117.287L119.367 44H114.599L114.311 38.72H108.743L106.791 44H101.767ZM110.151 34.88H114.087L113.863 29.248C113.842 28.4373 113.799 27.6373 113.735 26.848C113.692 26.0373 113.66 25.408 113.639 24.96C113.49 25.408 113.287 26.0267 113.031 26.816C112.796 27.6053 112.53 28.4053 112.231 29.216L110.151 34.88ZM129.819 44.32C128.261 44.32 126.939 44.032 125.851 43.456C124.763 42.8587 123.984 42.0373 123.515 40.992C123.045 39.9253 122.917 38.688 123.131 37.28L124.699 27.36C124.933 25.9307 125.456 24.6933 126.266 23.648C127.077 22.6027 128.112 21.792 129.371 21.216C130.651 20.6187 132.069 20.32 133.627 20.32C135.205 20.32 136.528 20.6187 137.595 21.216C138.661 21.792 139.44 22.6027 139.931 23.648C140.421 24.6933 140.549 25.9307 140.315 27.36H135.515C135.685 26.4213 135.547 25.7067 135.099 25.216C134.651 24.7253 133.947 24.48 132.987 24.48C132.027 24.48 131.248 24.7253 130.651 25.216C130.053 25.7067 129.669 26.4213 129.499 27.36L127.931 37.28C127.781 38.1973 127.931 38.912 128.379 39.424C128.827 39.9147 129.531 40.16 130.491 40.16C131.451 40.16 132.229 39.9147 132.827 39.424C133.424 38.912 133.797 38.1973 133.947 37.28H138.747C138.533 38.688 138.011 39.9253 137.179 40.992C136.368 42.0373 135.333 42.8587 134.075 43.456C132.816 44.032 131.397 44.32 129.819 44.32ZM141.422 44L145.134 20.64H149.934L148.494 29.696H150.67L156.046 20.64H161.262L154.478 32.096L157.742 44H152.654L150.222 34.112H147.79L146.222 44H141.422ZM161.09 44L164.802 20.64H179.202L178.53 24.736H168.834L168.002 29.984H176.578L175.938 34.08H167.362L166.434 39.904H176.13L175.49 44H161.09ZM179.797 44L183.509 20.64H191.029C192.693 20.64 194.08 20.928 195.189 21.504C196.32 22.08 197.13 22.9013 197.621 23.968C198.133 25.0347 198.272 26.2933 198.037 27.744C197.866 28.9387 197.472 30.0373 196.853 31.04C196.234 32.0213 195.456 32.8427 194.517 33.504C193.6 34.1653 192.576 34.6027 191.445 34.816L192.053 32.448L195.797 44H190.837L188.213 35.168H185.973L184.565 44H179.797ZM186.613 31.008H189.365C190.432 31.008 191.296 30.7413 191.957 30.208C192.64 29.6747 193.056 28.928 193.205 27.968C193.376 26.9653 193.205 26.1867 192.693 25.632C192.202 25.0773 191.424 24.8 190.357 24.8H187.605L186.613 31.008Z"
        fill={prop.theme === "dark" ? "white" : "black"}
        //fill={svgStyle.fill}
      />
      <path
        d="M21.128 43.32C19.5707 43.32 18.2587 43.032 17.192 42.456C16.1467 41.8587 15.3893 41.0373 14.92 39.992C14.472 38.9253 14.3547 37.688 14.568 36.28L16.136 26.36C16.3707 24.952 16.8827 23.7253 17.672 22.68C18.4613 21.6133 19.4747 20.792 20.712 20.216C21.9707 19.6187 23.3787 19.32 24.936 19.32C26.5147 19.32 27.8267 19.6187 28.872 20.216C29.9387 20.792 30.696 21.6133 31.144 22.68C31.6133 23.7253 31.7307 24.952 31.496 26.36L29.928 36.28C29.7147 37.688 29.2027 38.9253 28.392 39.992C27.6027 41.0373 26.5893 41.8587 25.352 42.456C24.1147 43.032 22.7067 43.32 21.128 43.32ZM21.8 39.16C22.76 39.16 23.5173 38.9147 24.072 38.424C24.6267 37.912 24.9787 37.1973 25.128 36.28L26.696 26.36C26.8667 25.4213 26.7493 24.7067 26.344 24.216C25.96 23.7253 25.2773 23.48 24.296 23.48C23.3147 23.48 22.5467 23.7253 21.992 24.216C21.4587 24.7067 21.1067 25.4213 20.936 26.36L19.368 36.28C19.2187 37.1973 19.3467 37.912 19.752 38.424C20.1573 38.9147 20.84 39.16 21.8 39.16ZM32.8915 43L36.6035 19.64H44.5715C46.2142 19.64 47.5902 19.9493 48.6995 20.568C49.8302 21.1867 50.6408 22.0507 51.1315 23.16C51.6435 24.2693 51.7822 25.5707 51.5475 27.064C51.3128 28.536 50.7688 29.8373 49.9155 30.968C49.0622 32.0773 47.9742 32.9413 46.6515 33.56C45.3288 34.1787 43.8462 34.488 42.2035 34.488H39.0355L37.6915 43H32.8915ZM39.7395 30.168H42.9075C43.9315 30.168 44.7848 29.8907 45.4675 29.336C46.1715 28.76 46.5982 28.0027 46.7475 27.064C46.8968 26.1253 46.7048 25.3787 46.1715 24.824C45.6595 24.248 44.8915 23.96 43.8675 23.96H40.6995L39.7395 30.168Z"
        fill="white"
      />
      <defs>
        <clipPath id="clip0_4_13">
          <rect width="64" height="62" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LogoSVG;
