"use client";
import React, { useEffect, useRef, useState } from "react";
import JobCard from "../components/JobCard";
import ModalOverlay from "../components/ModalOverlay";
import ClaimedJobCard from "../components/ClaimedJobCard";
import RemovalJobModal from "../components/RemovalJobModal";
import Navbar from "../components/Navbar";

interface ClaimedJobs {
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
  removalCompany: string;
  removalDate?: string;
  claimDate?: string;
}

export default function ClaimedJobsPage() {
  const [jobs, setJobs] = useState<ClaimedJobs[]>([]);
  const [jobSelected, setJobSelected] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIsland, setSelectedIsland] = useState<string>("");

  const getClaimedJobs = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });
      const data = await response.json();
      setJobs(data);

      if (response.ok) {
        console.log("Claimed jobs retrieved");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const filterByIsland = (job: ClaimedJobs) => {
    return selectedIsland === "" || job.island === selectedIsland;
  };

  const handleOnClick = (e: any) => {
    const removalButtonClicked =
      e.target.tagName === "BUTTON" &&
      e.target.innerText === "Removal Complete";

    if (removalButtonClicked) {
      setJobSelected(e.target.parentElement.id);
      setIsModalOpen(true);
    }
  };

  const handleRemovalJobClaimSubmit = async () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getClaimedJobs();
  }, [isModalOpen]);

  const removalCompleteJobs = jobs.filter((j) => j.status === "removed");

  return (
    <>
      <section
        className="flex flex-col items-center 
      justify-center custom-background min-h-screen h-fit"
      >
        <Navbar />
        <h1
          className="text-md text-4xl font-extrabold text-white text-center 
        lg:text-left pb-8 mt-24"
        >
          Claimed Jobs Available
        </h1>
        <div className=" md:mr-12 my-8 mb-12 flex flex-row items-center justify-center gap-1">
          <label
            className="text-black px-4 flex flex-row items-center justify-center gap-1"
            htmlFor="island"
          >
            <img src="/assets/filter.png" alt="Filter" className="h-6 xl:h-8" />{" "}
          </label>
          <select
            value={selectedIsland}
            onChange={(e) => setSelectedIsland(e.target.value)}
            className="w-[160px] h-12 border-slate-300 border-2 rounded-md focus:rounded-none p-2 text-black"
          >
            <option value="">All Islands</option>
            <option value="Oahu">Oahu</option>
            <option value="Big Island">Big Island</option>
            <option value="Maui">Maui</option>
            <option value="Kauai">Kauai</option>
            <option value="Lanai">Lanai</option>
            <option value="Molokai">Molokai</option>
          </select>
        </div>
        <div className="grid xl:grid-cols-2 gap-8 text-black">
          {jobs
            .filter((j) => j.status === "claimed" && filterByIsland(j))
            .map((job, index) => (
              <JobCard
                key={index}
                job={job}
                onClick={handleOnClick}
                claimed={false}
                setJobSelected={setJobSelected}
                setIsModalOpen={setIsModalOpen}
                btnMessage="Removal Complete"
                removalCompany={job.removalCompany}
              />
            ))}
        </div>

        {jobs.filter((j) => j.status === "claimed" && filterByIsland(j))
          .length === 0 && (
          <div className="h-[800px] text-sm text-center text-white flex flex-col-reverse gap-8 items-center justify-center">
            No claimed jobs available for the selected island.
            <img src="/assets/map.png" alt="Hawaii map" className="h-24" />
          </div>
        )}
        {/* ______________claimed tasks________________ */}
        {removalCompleteJobs.length > 0 && (
          <>
            <div className="h-[1px] w-1/2 bg-white/20 my-4 mt-24 mb-12"></div>
            <h2 className="text-2xl md:text-xl mb-12 xl:text-2xl font-extrabold text-white text-center lg:text-left pb-8">
              Removal Complete and Pending Processing
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-16 text-black">
              {removalCompleteJobs.map((claimedJob, index) => (
                <ClaimedJobCard
                  key={index}
                  claimedJob={claimedJob}
                  onClick={handleOnClick}
                  claimingCompany={claimedJob.removalCompany}
                  status={"Removed"}
                  lastUpdateDate={claimedJob.removalDate ?? ""}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <ModalOverlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />{" "}
      {isModalOpen && (
        <RemovalJobModal
          onSubmit={handleRemovalJobClaimSubmit}
          onClose={() => setIsModalOpen(false)}
          job={jobSelected}
        />
      )}
    </>
  );
}
