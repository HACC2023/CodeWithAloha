import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { LuBadgeAlert } from "react-icons/lu";

export default function ReportFormCardLink() {
  return (
    <>
      <div
        className="rounded md:overflow-hidden mt-8 xl:mt-12 h-fit
       xl:h-2/3 lg:w-[400px]  md:w-[600px] bg-white 
         shadow-2xl flex flex-col items-center justify-start
         relative hover:shadow-2xl transition duration-300 ease-out 
         "
      >
        <div className="flex flex-col items-center justify-start mt-8 xl:mt-[5rem]">
          <h2
            className="text-center text-black font-bold xl:text-2xl mb-2 
           uppercase"
          >
            Found Marine Debris?
          </h2>
          <h3
            className="max-w-[300px] text-[.8rem] px-8 xl:text-md 
            text-center mb-6 font-semibold
           text-slate-700"
          >
            Report It Here, and We&apos;ll Take Care of the Removal
          </h3>
        </div>
        <Link
          href="/report"
          className="text-sm xl:text-md text-white
           px-4 xl:w-1/2 h-8 xl:h-[3rem] uppercase rounded-full
          flex flex-col items-center justify-center shadow-lg
          custom-background hover:translate-y-1 hover:shadow-2xl transition 
          duration-500 ease-in-out
          cursor-pointer"
        >
          Report debris
        </Link>

        <div
          className="h-[240px] xl:w-[300px] md:w-[80%]  w-[90%] bg-cyan-300/10 md:bg-cyan-50/90 rounded-md shadow-lg
flex flex-col items-center justify-center mt-8 gap-2 py-4 mx-12 z-20 mb-[200px] border"
        >
          <LuBadgeAlert className="text-2xl  xl:text-3xl text-orange-400" />
          <p className="font-semibold px-12 text-center text-black text-sm  xl:text-md">
            Are there marine animals entangled in the debris?
          </p>
          <div className="h-[1px] w-1/2 bg-orange-400 my-1  "></div>
          <p className=" text-[.6rem] lg:text-[.8rem] text-black">
            Call NOAA immediately at{" "}
          </p>
          <p
            className="xl:text-md text-sm font-bold flex flex-row items-center 
          justify-center gap-2 text-black"
          >
            <BiSolidPhoneCall />
            <a href="tel:1-888-256-9840">
            1-888-256-9840
            </a>
          </p>
          <p className="text-[.6rem] lg:text-[.8rem] text-black">
            24/7 Emergency Hotline
          </p>
        </div>
        <div
          className="h-[200px] md:h-[260px] xl:h-[300px] w-full absolute bottom-0 bg-slate-900
        bg-[url('/assets/sealion.png')] bg-cover bg-no-repeat bg-bottom z-[8] rounded-b "
        ></div>
      </div>
    </>
  );
}
