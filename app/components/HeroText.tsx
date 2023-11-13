import React from "react";
import DonateButton from "./DonateButton";
import Image from "next/image";

const HeroText = () => {
  return (
    <div className="md:ml-6 flex flex-col items-start justify-center gap-2 xl:gap-6">
      <img
        src="./assets/hpu logo.png"
        className="max-w-[160px]  xl:max-w-[200px] 
      hidden lg:block"
      />
      <div className="h-[1px] w-[300px] bg-blue-300/20 hidden lg:block my-4"></div>
      <h1
        className="text-md md:text-2xl xl:text-4xl  font-extrabold
       text-white text-center lg:text-left"
      >
        <p className="lg:hidden uppercase mb-2 mt-6">
          Hawai&apos;s Pacific University
        </p>
        Center for Marine Debris Research
      </h1>

      <p
        className="text-blue-100/80 xl:text-xl 
         max-w-[300px] lg:max-w-[500px] 
      hidden lg:block font-normal"
      >
        World&apos;s premier center for pioneering plastic pollution research
      </p>
      <div className="hidden lg:block">
        <DonateButton />
      </div>
    </div>
  );
};

export default HeroText;
