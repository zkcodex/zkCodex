import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../redux/ThemeContext";

const GaugeScoreCard = ({ level, score }) => {
  const { theme } = useContext(ThemeContext);
  const [size, setSize] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [animatedOffset, setAnimatedOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newSize = Math.max(Math.min(screenWidth / 12, 110), 85);
      setSize(newSize);
      setStrokeWidth(newSize / 9.5);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let textColor = "black";
  const cappedScore = Math.min(Math.max(score, 0), 100);

  if (cappedScore < 50) {
    textColor = "red";
  } else if (cappedScore >= 50 && cappedScore < 80) {
    textColor = "yellow";
  } else {
    textColor = "green";
  }

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - cappedScore) / 100) * circumference;

  useEffect(() => {
    setAnimatedOffset(offset);
  }, [offset]);

  const lines = [];
  for (let i = 0; i < 360; i += 15) {
    const x1 =
      size / 2 + (radius - strokeWidth / 3) * Math.cos((i * Math.PI) / 180);
    const y1 =
      size / 2 + (radius - strokeWidth / 3) * Math.sin((i * Math.PI) / 180);
    const x2 =
      size / 2 + (radius + strokeWidth / 3) * Math.cos((i * Math.PI) / 180);
    const y2 =
      size / 2 + (radius + strokeWidth / 3) * Math.sin((i * Math.PI) / 180);
    lines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-block",
        borderRadius: "50%",
        position: "relative",
      }}
      className="shadow-xl drop-shadow-xl"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(140, 180, 255)" />
            <stop offset="15%" stopColor="rgb(120, 160, 255)" />
            <stop offset="30%" stopColor="rgb(100, 140, 255)" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" />
            <stop offset="70%" stopColor="rgb(80, 100, 200)" />
            <stop offset="85%" stopColor="rgb(60, 80, 180)" />
            <stop offset="100%" stopColor="rgb(40, 60, 160)" />
          </linearGradient>
        </defs>
        {/* Circle with gradient stroke */}
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          strokeOpacity={0.9}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dash offset 0.5s ease-in-out" }}
        />
        {/* Border circle */}
        <circle
          fill={
            theme === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)"
          }
          strokeWidth={1}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", left: size * 0.125, top: size * 0.125 }}
        color={textColor}
      >
        {lines}
      </svg>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div
          className={`text-[10px] sm:text-xs md:text-sm 
          ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
        `}
        >
          {cappedScore}
        </div>
        {level && (
          <div
            className={`text-[10px] sm:text-xs md:text-sm 
            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
          `}
          >
            {level}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaugeScoreCard;
