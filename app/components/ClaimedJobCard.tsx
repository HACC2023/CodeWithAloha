import React from "react";
import Image from "next/image";

import { BsBookmark } from "react-icons/bs";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import {
  MdOutlineLocationOn,
  MdGpsFixed,
  MdOutlineDateRange,
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

interface ClaimedJobCardProps {
  claimedJob: RemovalJobs;
  onClick: (e: React.MouseEvent) => void;
  claimingCompany: string;
  status: string;
  lastUpdateDate: string;
}

const ClaimedJobCard: React.FC<ClaimedJobCardProps> = ({
  claimedJob,
  onClick,
  claimingCompany,
  status,
  lastUpdateDate,
}) => {
  return (
    <div
      id={`job-${claimedJob.id}`}
      onClick={onClick}
      className="w-fit border rounded-md cursor-pointer shadow-lg bg-gray-50 
      flex flex-col items-start justify-between gap-1 w-250 "
    >
      <div className="w-full flex flex-row items-between justify-between px-4 py-4">
        <div className="flex flex-row items-center gap-2">
          <p className="self-end bg-yellow-200 px-2 py-1 rounded-full text-[.6rem]">
            {" "}
            Report ID: {claimedJob.id}
          </p>
          <h1 className="text-black self-center font-bold">
            {claimedJob.island} report
          </h1>
        </div>
        <div className="flex flex-row items-center justify-start gap-1">
          <img src="/assets/pending.png" alt="pending status" className="h-6" />
          <p>{status}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start px-4 gap-1">
        <div className="h-[1px] w-full bg-slate-200"> </div>

        <p className="text-slate-600  flex flex-row items-center justify-center gap-1">
          {" "}
          <MdOutlineDateRange />
          <span className="font-semibold ">{claimedJob.date}</span>{" "}
        </p>
        <p className="text-black flex flex-row items-center justify-start gap-1">
          <MdOutlineLocationOn className=" text-slate-500" />
          <span className="font-semibold">Address</span> {claimedJob.address}
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
                {claimedJob.latitude}
              </span>
            </p>
            <p>
              {" "}
              longitude{" "}
              <span className="border  px-1 bg-white rounded-sm">
                {claimedJob.longitude}
              </span>
            </p>
          </div>
        </div>

        <p className="text-black">Debris Type: {claimedJob.debrisType}</p>
        <p className="text-black">
          Container Status - {claimedJob.containerStatus}
        </p>
        <p className="text-black">Biofouling - {claimedJob.biofouling}</p>
        <p className="font-semibold flex flex-row items-center justify-center gap-1">
          {" "}
          <BsBookmark className="text-sm text-slate-500 mr-1" />
          Details
        </p>

        <div className="flex flex-row items-center justify-start gap-2 ">
        {claimedJob.images.split('-----').map((image, index) => (
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
          className={` h-[30px]
                      text-slate-500 min-w-[260px] w-80 md:w-[600px]`}
        >
          {claimedJob.description}
        </p>
        <p className="font-semibold">Observer&apos;s contact info</p>
        <p className="text-slate-600  flex flex-row items-center justify-center gap-1">
          <AiOutlineMail /> {claimedJob.email}
        </p>
        <p className="text-slate-600 flex flex-row items-center justify-center gap-1">
          <AiOutlinePhone /> {claimedJob.phone}
        </p>
      </div>

      <div className="bg-slate-200 w-full p-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <p className="text-black font-semibold">Status: </p>
          <img src="/assets/pending.png" alt="pending status" className="h-6" />
          <p>{status}</p>
        </div>
        <p className="text-black font-semibold">
          Claiming Company:{" "}
          <span className="font-normal">{claimingCompany}</span>
        </p>

        <p className="text-black font-semibold">
          Last Update: <span className="font-normal">{lastUpdateDate}</span>
        </p>
      </div>
    </div>
  );
};

export default ClaimedJobCard;
