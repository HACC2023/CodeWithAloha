import React from "react";
import Image from "next/image";

import { BsBookmark } from "react-icons/bs";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import {
  MdOutlineLocationOn,
  MdGpsFixed,
  MdOutlineDateRange,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";

interface RemovalJobs {
  id: string;
  address: string;
  latitude: string;
  longitude: string;
  date: string;
  debrisType: string;
  containerStatus: string;
  biofouling: string;
  description: string;
  island: string;
  email: string;
  phone: string;
  captcha: string;
  status: string;
  images: string;
}

interface JobCardProps {
  job?: RemovalJobs;
  claimedJob?: RemovalJobs;
  onClick: (e: React.MouseEvent) => void;
  claimed?: boolean;
  setJobSelected: (jobId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  btnMessage: string;
}

function JobCard({
  job,
  claimedJob,
  onClick,
  claimed,
  setJobSelected,
  setIsModalOpen,
  btnMessage
}: JobCardProps) {
  const data = claimed ? claimedJob : job;
  if (!data) {
    return null;
  }
  const handleOnClick = (e: any) => {
    const claimButtonClicked =
      e.target.tagName === "BUTTON" && e.target.innerText === btnMessage;

    if (claimButtonClicked) {
      setJobSelected(e.target.parentElement.id);
      setIsModalOpen(true);
    }
  };
  return (
    <div
      id={`job-${data.id}`}
      onClick={onClick}
      className="w-fit border rounded-md cursor-pointer shadow-lg bg-gray-50 flex flex-col items-start justify-between gap-1 w-250 px-4 pb-4"
    >
      <div className="w-full flex flex-row items-between justify-between">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/new2.png" alt="New" className="h-12" />
          <h1 className="text-black self-center font-bold">
            {data.island} report
          </h1>
        </div>
        <p className="text-slate-600  flex flex-row items-center justify-center gap-1">
          {" "}
          <MdOutlineDateRange />
          <span className="text-[.8rem] ">{data.date}</span>{" "}
        </p>
      </div>

      <div className="h-[1px] w-full bg-slate-200"> </div>
      <p className="self-end bg-yellow-200 px-2 py-1 rounded-full text-[.6rem]">
        {" "}
        Report ID: {data.id}
      </p>

      <p className="text-black flex flex-row items-center justify-start gap-1">
        <MdOutlineLocationOn className="text-xl text-slate-500" />
        <span className="font-semibold">Address</span> {data.address}
      </p>
      <div className="flex flex-row items-start justify-start gap-1">
        <p className="text-black flex flex-row items-center justify-start gap-1">
          <MdGpsFixed className=" text-slate-500 " />
          <span className="font-semibold">Coords</span>
        </p>
        <div className="flex flex-col xl:flex-row items-start justify-start gap-1">
          <p>
            {" "}
            latitude{" "}
            <span className="border  px-1 bg-white rounded-sm">
              {data.latitude}
            </span>
          </p>
          <p>
            {" "}
            longitude{" "}
            <span className="border  px-1 bg-white rounded-sm">
              {data.longitude}
            </span>
          </p>
        </div>
      </div>

      <p className="text-black">Debris Type: {data.debrisType}</p>
      <p className="text-black">Container Status - {data.containerStatus}</p>
      <p className="text-black">Biofouling - {data.biofouling}</p>
      <p className="font-semibold flex flex-row items-center justify-center gap-1">
        {" "}
        <BsBookmark className="text-sm text-slate-500 mr-1" />
        Details
      </p>

      <div className="flex flex-row items-center justify-start gap-2 ">
        {data.images.split('-----').map((image, index) => (
              <div
                key={index}
                className="flex flex-row items-end gap-4"
              >
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={image}
                    alt="Image Preview"
                    style={{ maxHeight: "100px" }}
                    className="h-auto"
                  />
                </span>
              </div>
        ))}
      </div>
      <br />

      <p
        className={`border bg-white shadow-sm h-fit 
                    min-h-[100px] p-2 text-slate-500 min-w-[260px] w-80 md:w-[600px]`}
      >
        {data.description}
      </p>

      <div className="h-[1px] w-full bg-slate-200 my-2"> </div>

      <p className="text-slate-600 text-[.8rem] flex flex-row items-center justify-center gap-1">
        <AiOutlineMail /> {data.email}
      </p>
      <p className="text-slate-600 text-[.8rem] flex flex-row items-center justify-center gap-1">
        <AiOutlinePhone /> {data.phone}
      </p>
      <button
        onClick={handleOnClick}
        className="text-sm xl:text-md text-white self-end
           px-4 xl:w-fit h-8 xl:h-[2.2rem]  rounded-full  shadow-lg
          custom-background2 hover:translate-y-1 hover:shadow-2xl transition 
          duration-500 ease-in-out
          cursor-pointer flex flex-row items-center justify-center gap-2"
      >
        <MdOutlineAssignmentTurnedIn className="text-xl" /> {btnMessage}
      </button>
    </div>
  );
}

export default JobCard;
