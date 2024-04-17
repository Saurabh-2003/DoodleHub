import React from "react";


const Colors = () => {


  return (
    <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        className="size-80  max-sm:size-60 duration-200 transition-all"
    >
      <defs>
        <radialGradient
          id="emeraldGradient"
          gradientUnits="userSpaceOnUse"
          r="50%"
          cx="40%"
          cy="40%"
        >
          <stop stopColor={ "#0000FF" } />
          <stop offset={1} stopColor="#404040" />
        </radialGradient>
      </defs>
      <path
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd"
        className="fill-neutral-950/50"
        stroke="url(#emeraldGradient)"
        
        />
         <path 
         stroke="url(#emeraldGradient)"
         fillRule="evenodd"
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="fill-neutral-950/50"
         d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />

    </svg>
  );
};

export default Colors;


