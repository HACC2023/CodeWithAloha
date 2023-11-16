"use client";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useRoleCheck from "../api/rolecheck";
import Navbar from "../components/Navbar";
import router, { useRouter } from "next/router";
import GoogleMapReact from "google-map-react";

interface RemovalJobs {
  id: string;
  location: string;
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
  debrisApproxSize: string;
}

interface DebrisTypeSummary {
  name: string;
  value: number;
}

const colors = [
  "#006d77", // rich blue-green
  "#83c5be", // soft blue-green
  "#edf6f9", // very light blue-green
  "#ffddd2", // light coral for contrast
  "#3a86ff", // vibrant blue
  "#00b4d8", // bright cyan
  "#0077b6", // strong blue
  "#0096c7", // deep sky blue
  "#48cae4", // bright blue-green
  "#90e0ef", // light blue-green
  "#ade8f4", // pale blue-green
  "#caf0f8", // very pale blue
];

export default function ResultsPage() {
  const [jobs, setJobs] = useState<RemovalJobs[]>([]);

  function transformRemovalJobsData(jobs: RemovalJobs[]): DebrisTypeSummary[] {
    return jobs.reduce((acc: DebrisTypeSummary[], job: RemovalJobs) => {
      // // Find if the debrisType already exists in the accumulator
      // const existingType = acc.find(item => item.name === job.debrisType);

      // if (existingType) {
      //   // If found, increase the count
      //   existingType.value += 1;
      // } else {
      //   // If not found, add a new entry with a count of 1
      //   acc.push({ name: job.debrisType, value: 1 });
      // }

      const counts = jobs.reduce(
        (acc: Record<string, number>, job: RemovalJobs) => {
          acc[job.debrisType] = (acc[job.debrisType] || 0) + 1;
          return acc;
        },
        {},
      );

      // Then, calculate the percentages
      const total = jobs.length;
      return Object.keys(counts).map((debrisType) => ({
        name: debrisType,
        value: parseFloat(((counts[debrisType] / total) * 100).toFixed(2)), // Convert to percentage
      }));
    }, []);
  }

  const calculateFishingGearPercentage = (data: RemovalJobs[]) => {
    const totalCount = data.length;
    const fishingGearCount = data.filter(
      (job) => job.debrisType === "A mass of netting and/or fishing gear",
    ).length;
    const fishingGearPercentage = parseFloat(
      ((fishingGearCount / totalCount) * 100).toFixed(2),
    );
    const otherPercentage = parseFloat(
      (100 - fishingGearPercentage).toFixed(2),
    );

    return [
      {
        name: "Fishing Gear",
        value: fishingGearPercentage,
      },
      {
        name: "Other",
        value: otherPercentage,
      },
    ];
  };

  function sumDebrisAmountByType(jobs: RemovalJobs[]): DebrisTypeSummary[] {
    // First, sum up the amounts by debris type
    const debrisAmountSum = jobs.reduce((acc: Record<string, number>, job) => {
      console.log("JOB IS:", job);
      const amount = parseFloat(job.debrisApproxSize) || 0;
      acc[job.debrisType] = (acc[job.debrisType] || 0) + amount;
      return acc;
    }, {});

    // Then, transform the record into an array of DebrisTypeSummary
    return Object.entries(debrisAmountSum).map(([name, value]) => ({
      name,
      value,
    }));
  }

  const getRemovalJobs = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });
      const data = await response.json();
      setJobs(data);

      if (response.ok) {
        // Success - display success message, next steps, etc.
        console.log("SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      // Handle network/server errors
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin" && userRole !== "removal") {
      window.location.href = "/login";
    } else {
      getRemovalJobs();
    }
  }, []);

  const debrisPercentageData = transformRemovalJobsData(jobs);
  const fishingGearPercentageData = calculateFishingGearPercentage(jobs);
  const debrisByTypeData = sumDebrisAmountByType(jobs).filter(
    (debris) => debris.value > 0,
  );
  console.log("DEBRIS BY TYPE", debrisByTypeData);

  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);

  const renderMarkers = (map: any, maps: any, jobs: any) => {
    console.log("Jobs in render:", jobs);
    for (let i = 0; i < jobs.length; i++) {
      const marker = new maps.Marker({
        position: {
          lat: Number(jobs[i].latitude),
          lng: Number(jobs[i].longitude),
        },
        map,
        title: "Hello World!",
      });
    }
  };

  console.log("Jobs:", jobs);

  useEffect(() => {
    if (map && maps && jobs.length > 0) {
      renderMarkers(map, maps, jobs);
    }
  }, [map, maps, jobs]);

  return (
    <div className="h-fit custom-background">
      <Navbar />
      <div className="flex justify-center items-center text-center w-full mt-24 mb-12">
        <h1 className="text-2xl xl:text-4xl font-extrabold text-white">
          Reports and stats
        </h1>
      </div>

      <h2 className="font-semibold text-xl ml-[10%] text-white mb-2">
        Last reports locations
      </h2>
      <center>
        <div
          className="rounded-md border-4 border-white shadow-xl"
          style={{ height: "600px", width: "80%" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            }}
            defaultCenter={{
              lat: Number(21.306944),
              lng: Number(-157.858337),
            }}
            defaultZoom={14}
            // Disable controls
            options={{ disableDefaultUI: false, zoomControl: false }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => {
              setMap(map);
              setMaps(maps);
            }}
          ></GoogleMapReact>
        </div>
      </center>

      <div className="flex flex-row items-center justify-between max-w-[80%]  mx-auto mt-24">
        <div className="flex flex-col w-[400px] p-8 mb-12 chart-background rounded-md">
          <h2 className="text-white text-2xl justify-center font-semibold m-auto mb-6">
            Debris Type Percentage
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
              <Pie
                data={debrisPercentageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debrisPercentageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index] ?? "#8884d8"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col w-[400px] p-8 mb-12 chart-background">
          <h2 className="text-white text-2xl justify-center m-auto">
            Fishing Gear vs Other
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
              <Pie
                data={fishingGearPercentageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debrisPercentageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index] ?? "#8884d8"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col  items-center justify-center mt-24">
        <div className="flex flex-col w-[800px] mx-2 mb-24">
          <h2 className="text-white mb-6 font-semibold text-2xl justify-center m-auto">
            Marine Debris by Type
          </h2>
          <ResponsiveContainer
            width="100%"
            height={400}
          
            style={{ backgroundColor: "#edf6f9", marginRight: "1em" }}
          >
            <BarChart data={debrisByTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                contentStyle={{ backgroundColor: "white", color: "black" }}
              />
              <XAxis
                dataKey="name"
                width={20}
                tick={{ fontSize: 10 }}
                interval={0}
              />
              <YAxis />
              <Bar fill="#006D77" dataKey="value" barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
