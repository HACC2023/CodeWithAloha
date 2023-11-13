import React from "react";
import Image from "next/image";

const DonateButton: React.FC = () => {
  return (
    <div
      className="flex flex-row items-center justify-center hover:scale-105
    gap-4 bg-slate-950 p-4 px-6 rounded-full mt-8 shadow-lg cursor-pointer 
    transition-all ease-in-out"
    >
      <img src="/assets/donate.png"
      alt="Donate" className="h-12" />

      <div className="flex flex-col items-start gap-1">
        <p
          className="text-yellow-300 text-md font-semibold uppercase
        hover:text-yellow-500 transition-all ease-in-out"
        >
          Donate
        </p>
        <p className="text-white text-[.8rem]">Support our research</p>
      </div>
    </div>
  );
};

export default DonateButton;
