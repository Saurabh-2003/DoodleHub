
import React, { useState, useEffect } from "react";

const Image = () => {
  // const [gradientCenter, setGradientCenter] = useState({ cx: "50%", cy: "50%" });

  // useEffect(() => {
  //   if (cardRef.current && cursor.x !== null && cursor.y !== null) {
  //     const cardRect = cardRef.current.getBoundingClientRect();
  //     const cxPercentage = (cursor.x / cardRect.width) * 100 - 24;
  //     const cyPercentage = (cursor.y / cardRect.height) * 100;
  //     setGradientCenter({
  //       cx: `${cxPercentage}%`,
  //       cy: `${cyPercentage}%`,
  //     });
  //   }
  // }, [cursor, cardRef]);

  return (
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        className="size-80 duration-200 transition-all"
    >
      <defs>
        <radialGradient
          id="emeraldGradient"
          gradientUnits="userSpaceOnUse"
          r="35%"
          cx="50%"
          cy="50%"
        >
          <stop stopColor={"#0000FF"} />
          <stop offset={1} stopColor="#404040" />
        </radialGradient>
      </defs>
      <path
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        className="fill-neutral-950/50"
        stroke="url(#emeraldGradient)"
        />
    </svg>
  );
};

export default Image;
