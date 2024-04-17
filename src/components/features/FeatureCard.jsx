import React, { useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";

const FeatureCard = ({ iconComponent, SVG, title, description, featureItems, index }) => {
  // const cardRef = useRef(`cardRef_${index}`);
  // const [cursor, setCursor] = useState({ x: 0, y: 0 });
  // const [mouseOnCard, setMouseOnCard] = useState(false);

  // const handleMouseMove = (event) => {
  //   if (cardRef.current !== null) {
  //     const rect = cardRef.current.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     setCursor({ x: x, y: y });
  //   }
  // };

  // const handleMouseEnter = () => {
  //   setMouseOnCard(true);
  // };

  // const handleMouseLeave = () => {
  //   setMouseOnCard(false);
  // };

  return (
    <section
      key={index}
      className="w-[600px] relative max-sm:w-[350px] h-fit flex p-8 border border-zinc-700 bg-zinc-800/60 rounded-2xl stroke-[0.1] hover:stroke-[0.15]"
      
    >
      <div className="flex flex-col z-[1]  justify-between">
        <div className="flex w-full flex-col gap-5">
          {iconComponent && (
            <div className="rounded-lg bg-zinc-900 border border-zinc-600 size-fit text-indigo-600 p-2 shadow-inner">
              {iconComponent}
            </div>
          )}
          <h1 className="font-poppins text-neutral-200 tracking-wide text-2xl">
            {title}
          </h1>
          <p className="-mt-2 font-poppins text-neutral-500 tracking-wide">
            {description}
          </p>
        </div>
        <div className="flex max-sm:w-full flex-col max-sm:flex-row font-poppins text-neutral-200 tracking-wide">
          {featureItems.map((item, index) => (
            <span key={index} className="flex max-sm:w-full flex-row gap-2">
              <BiCheck size={40} />
              <p>{item}</p>
            </span>
          ))}
        </div>
      </div>
      <div className=" max-sm:right-0 max-sm:top-0 max-sm:opacity-60  max-sm:absolute flex flex-col place-items-center">
        <SVG />
      </div>
    </section>
  );
};

export default FeatureCard;
