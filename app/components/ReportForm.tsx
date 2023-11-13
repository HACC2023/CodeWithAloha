"use client";
import React, { useState, useEffect } from "react";
import { MdGpsFixed } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import GoogleMapReact from "google-map-react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import Image from "next/image";

interface FormData {
  address: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
  date: string;
  debrisType: string;
  containerStatus: "Full";
  biofouling: number;
  debrisLocation: string;
  description: string;
  images: string[];
  island: string;
  email: string;
  phone: string;
  captcha: string;
}

const renderMarkers = (
  map: any,
  maps: any,
  latitude: Number,
  longitude: Number,
) => {
  let marker = new maps.Marker({
    position: { lat: latitude, lng: longitude },
    map,
    title: "Hello World!",
  });
  return marker;
};

function ReportForm() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    latitude: "",
    longitude: "",
    fullAddress: "",
    date: "",
    debrisType: "",
    containerStatus: "Full",
    biofouling: 0,
    debrisLocation: "",
    description: "",
    images: [],
    island: "",
    email: "",
    phone: "",
    captcha: "",
  });
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [containerStatus, setContainerStatus] = useState<string | null>(null);
  const [sealyText, setSealyText] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const message = [
    [
      " 4",
      "The image depicts a submerged structure with a significant amount of biofouling, which is the accumulation of microorganisms, plants, algae, or animals on wetted surfaces. Based on the visible marine growth, including what looks like mature barnacles and other encrusting organisms, this image would likely be classified as having heavy fouling. The original surface of the structure is almost completely obscured by the marine life that has settled on it.",
    ],
    [
      " 3 or 4",
      "The image you've provided shows a group of mussels attached to what appears to be the hull of a boat or a solid underwater structure. The mussels are densely packed together, with some algae and other marine organisms visible on the surface and around them. This is a typical example of biofouling, where various aquatic species attach themselves to submerged structures."
    ],
    [
      " 4",
      "The image shows a dense collection of barnacle-like organisms covering a submerged structure, possibly the hull of a ship or another man-made object. The organisms are tightly packed, with no visible space left between them, and they appear to be quite mature, suggesting that this biofouling has been developing for a considerable period."
    ]
  ];

  const showSealyText = function (
    target: string,
    message: string,
    index: number,
    interval: number,
  ) {
    if (index < message.length) {
      const e = document.querySelector(target) as any;
      e.textContent += message[index++];
      setSealyText(e.textContent);
      setTimeout(function () {
        const random = Math.floor(Math.random() * 50) + 1;
        showSealyText(target, message, index, random);
      }, interval);
    }
  };

  const handleSealyClick = (index: Number) => {
    const sealyText = document.querySelector("#sealy-text") as any;
    sealyText.textContent = "";
    showSealyText("#sealy-text", message[index as any][1], 0, 25);
    const e = document.querySelector('#sealy-level') as any;
    e.textContent = message[index as any][0];
  }


  // Image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageFiles = Array.from(files);

      const imageBase64s = await Promise.all(
        imageFiles.map(async (image) => {
          const url = URL.createObjectURL(image);
          const b64 = await toDataURL(url);
          return b64;
        }),
      );

      showSealyText("#sealy-text", message[0][1], 0, 25);
      const e = document.querySelector("#sealy-level") as any;
      e.textContent = message[0][0];

      setFormData({
        ...formData,
        images: imageBase64s as any,
      });
    }
  };
  const handleContainerStatusChange = (status: string) => {
    setContainerStatus(status);
  };

  const handleBiofoulingChange = (value: number) => {
    setFormData({ ...formData, biofouling: value });
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormData({ ...formData, date: getCurrentDate() });
  }, []); // Empty dependency array ensures this runs only once

  // Get exact location
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setFormData({
          ...formData,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });
        setShowCoordinates(true);

        // Get the full address based on the coordinates using Positionstack API
        const apiKey = "";
        const query = `96706`;

        try {
          const response = await fetch(
            `/api/forward?access_key=${apiKey}&query=${query}`,
          );

          if (response.ok) {
            const data = await response.json();
            const address = data.data.results[0]?.label || "Address not found";
            setFormData({ ...formData, fullAddress: address });
          }
        } catch (error) {
          console.error(error);
          setFormData({ ...formData, fullAddress: "Address not found" });
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  function toDataURL(url: any) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Failed to fetch data"));
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    setFormData({ ...formData, captcha: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("address", formData.address);
    form.append("latitude", formData.latitude);
    form.append("longitude", formData.longitude);
    form.append("date", formData.date);
    form.append("debrisType", formData.debrisType);
    form.append("containerStatus", formData.containerStatus);
    form.append("biofouling", String(formData.biofouling));
    form.append("description", formData.description);
    for (let i = 0; i < formData.images.length; i++) {
      const imageKey = `image${i}`;
      form.append(imageKey, formData.images[i]);
    }

    form.append("island", formData.island);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("captcha", formData.captcha);
    form.append("status", "pending");

    // Example: send formData to the server
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        // Success - display success message, next steps, etc.
        console.log("SUCCESS");
        window.location.href = "/report-submitted";
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      // Handle network/server errors
      console.log("ERROR", error);
    }
  };

  const debrisOptions = [
    "A mass of netting and/or fishing gear",
    "An abandoned or derelict boat",
    "A container/drum/cylinder",
    "A large concentration of plastics",
    "Potential Japan tsunami marine debris",
    "A large concentration of miscellaneous trash",
    "Other - describe below",
  ];
  const locationOptions = [
    "Caught on the reef or partially buried in sand",
    "Loose in the shore break or on the shoreline and could go back out to sea",
    "Trapped in a tide pool and cannot escape",
    "Loose on the shore but caught in the vegetation line",
    "Tied to a fixed object so it cannot be swept away",
    "Pushed inland above the high wash of the waves so it cannot be swept away",
    "Other - please explain in the description below",
  ];
  const sealyImages = [
    "/assets/example-1.png",
    "/assets/example-2.png",
    "/assets/example-3.png",
  ];

  return (
    <section
      className="flex flex-col items-center justify-center 
      gap-8 md:py-24 py-12    "
    >

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-6 pl-12 items-start justify-center gap-2 
        border-slate-500/30 border-2 rounded-md shadow-2xl p-6  
        md:p-8 bg-white/90"
      >
        <h2 className=" font-medium text-2xl text-black self-center">
          Report Marine Debris
        </h2>
        <div className="h-[1px] w-full bg-slate-200 my-4 k"></div>

        <div className="flex flex-col items-start text-black justify-between md:gap-12 ">
          {/* ____________________Location & address_________________ */}
          <div className="form-group">
            <label htmlFor="location">Location:</label>

            {!showCoordinates && (
              <div>
                <button
                  type="button"
                  onClick={getUserLocation}
                  className="bg-green-400/50 rounded-md shadow-md p-2 px-4
            flex flex-row items-center justify-center gap-2 mb-2"
                >
                  <MdGpsFixed /> Get My Current Location
                </button>

                <p>or describe the location manually</p>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full max-w-[600px] h-12 border-slate-300 border-2 rounded-md focus:rounded-none p-2"
                />
              </div>
            )}
            {showCoordinates && formData.latitude && formData.longitude && (
              // <div className="form-group mb-2">
              //   <p className="text-gray-600 ">
              //     Latitude:{" "}
              //     <span className="text-green-600 font-semibold">
              //       {" "}
              //       {formData.latitude}
              //     </span>{" "}
              //     | Longitude:{" "}
              //     <span className="text-green-600 font-semibold">
              //       {" "}
              //       {formData.longitude}{" "}
              //     </span>
              //   </p>
              // </div>
              <div style={{ height: "300px", width: "300px" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                  }}
                  defaultCenter={{
                    lat: Number(formData.latitude),
                    lng: Number(formData.longitude),
                  }}
                  defaultZoom={15}
                  // Disable controls
                  options={{ disableDefaultUI: false, zoomControl: false }}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) =>
                    renderMarkers(
                      map,
                      maps,
                      Number(formData.latitude),
                      Number(formData.longitude),
                    )
                  }
                ></GoogleMapReact>
              </div>
            )}

            {/* <div>
            <label htmlFor="address">Address:</label>
              <p className="text-gray-600 text-sm">
                Please provide specific details that help us pinpoint the debris
                location.
              </p>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full max-w-[600px]"
              />
            </div> */}
            <div className="form-group flex flex-row items-center gap-4 mt-5">
              <label htmlFor="island">Select Island</label>
              <select
                id="island"
                name="island"
                value={formData.island}
                onChange={handleChange}
                className="w-[200px] h-12 border-slate-300 border-2 rounded-md focus:rounded-none p-2"
              >
                <option value="" className="font-semibold">
                  Select an Island
                </option>
                <option value="Big Island" className="font-semibold">
                  Big Island
                </option>
                <option value="Oahu" className="font-semibold">
                  Oahu
                </option>
                <option value="Maui" className="font-semibold">
                  Maui
                </option>
                <option value="Kauai" className="font-semibold">
                  Kauai
                </option>
                <option value="Molokai" className="font-semibold">
                  Molokai
                </option>
              </select>
            </div>

            {/* ______________________DEBRIS TYPE_______________________ */}
            <div className="form-group">
              <label htmlFor="debrisType">Debris Type:</label>
              <select
                id="debrisType"
                name="debrisType"
                value={formData.debrisType}
                onChange={handleChange}
                className="w-full max-w-[600px] h-12 border-slate-300 border-2 rounded-md p-2
                "
              >
                <option value="">Select Debris Type</option>
                {debrisOptions.map((option, index) => (
                  <option key={index} value={option} className="max-w-[600px]">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* ______________________Container_______________________ */}
            {formData.debrisType === "A container/drum/cylinder" && (
              <div>
                <label>
                  <span className="font-semibold">
                    Did you find a container, a drum, or cylinder?
                  </span>{" "}
                  If yes, how full is it?
                </label>
                <div className="flex flex-row items-center start-center gap-4 pt-2">
                  <label className="flex flex-row items-center gap-1 justify-center">
                    <input
                      type="radio"
                      name="containerStatus"
                      value="Full"
                      checked={containerStatus === "Full"}
                      onChange={() => handleContainerStatusChange("Full")}
                      className="h-6 max-w-[600px]"
                    />
                    Full
                  </label>
                  <label className="flex flex-row items-center gap-1 justify-center">
                    <input
                      type="radio"
                      name="containerStatus"
                      value="Partially Filled"
                      checked={containerStatus === "Partially Filled"}
                      onChange={() =>
                        handleContainerStatusChange("Partially Filled")
                      }
                      className="h-6 max-w-[600px]"
                    />
                    Partially Filled
                  </label>
                  <label className="flex flex-row items-center gap-1 justify-center">
                    <input
                      type="radio"
                      name="containerStatus"
                      value="Empty"
                      checked={containerStatus === "Empty"}
                      onChange={() => handleContainerStatusChange("Empty")}
                      className="h-6 max-w-[600px]"
                    />
                    Empty
                  </label>
                </div>
              </div>
            )}
            {/* ______________________Debris Location Details_______________________ */}
            <div className="form-group pt-4">
              <label htmlFor="debrisLocation">
                The debris is best described as:
              </label>
              <select
                id="debrisLocation"
                name="debrisLocation"
                value={formData.debrisLocation}
                onChange={handleChange}
                className="w-full max-w-[600px] h-12 border-slate-300 border-2 p-2 rounded-md"
              >
                <option value="" className="h-2 pt-2 max-w-[600px]">
                  Select Debris Location Details
                </option>
                {locationOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option}
                    className="h-2 max-w-[600px] pt-2"
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* ______________________Biofouling_______________________ */}
            <div className="pt-2">
              <div
                className="flex flex-col items-start justify-start gap-4"
                title="The Level of Fouling LoF scale is a ranking system with six categories characterizing the amount of biofouling."
              >
                <label className="font-semibold pt-2">
                  Level of Fouling (LoF) [﹖]:
                </label>
                <input
                  type="range"
                  name="biofouling"
                  min={0}
                  max={5}
                  value={formData.biofouling}
                  onChange={(e) =>
                    handleBiofoulingChange(Number(e.target.value))
                  }
                  className="w-1/3 max-w-[600px]"
                />
                <p className="text-gray-600 text-sm">{formData.biofouling}</p>
              </div>
              <p className="text-gray-600 text-sm py-2 w-full max-w-[600px]">
                The Level of Fouling (LoF) scale is a ranking system with six
                categories characterizing the amount of biofouling.
              </p>
              <div>
                <p id="biofoulingDescription">
                  {formData.biofouling === 0 && (
                    <span className="font-semibold">
                      0: Zero slime/biofilm, zero macrofouling
                    </span>
                  )}
                  {formData.biofouling === 1 && (
                    <span className="font-semibold">
                      1: Light slime/biofilm, zero macrofouling
                    </span>
                  )}
                  {formData.biofouling === 2 && (
                    <span className="font-semibold">
                      2: Macrofouling present covering up to 5% of the surface
                    </span>
                  )}
                  {formData.biofouling === 3 && (
                    <span className="font-semibold">
                      3: Macrofouling covering from 6% to 15% of the surface
                    </span>
                  )}
                  {formData.biofouling === 4 && (
                    <span className="font-semibold">
                      4: Macrofouling covering from 16% to 40% of the surface
                    </span>
                  )}
                  {formData.biofouling === 5 && (
                    <span className="font-semibold">
                      5: Macrofouling covering more than 40% of the surface up
                      to 100%
                    </span>
                  )}
                </p>
              </div>
              <div>
                <img
                  src={`./assets/levels-of-fouling/${formData.biofouling}.png`}
                  alt="biofouling"
                  className="w-1/2 max-w-[600px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center">
            <div>
              {/*__________________ Email_____________________________ */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full max-w-[600px] h-12 border-slate-300 border-2 rounded-md p-2"
                />
              </div>

              {/*___________________ Phone Number_____________________ */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full max-w-[600px] h-12 border-slate-300 border-2 rounded-md p-2"
                />
                <p className="text-gray-600 text-sm py-2 w-full">
                  Please include area code (e.g. 808-555-5555)
                </p>
              </div>
              {/* __________________________IMAGE_____________________ */}
              <div className="form-group max-w-[340px]">
                <label htmlFor="image">Upload Images (up to 6):</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple // Allow multiple file selection
                  className="w-[300px]"
                />
                <p className="text-gray-600 text-sm py-2 w-full">
                  A photo can provide crucial information about the debris,
                  helping us better understand its nature and assisting in the
                  removal process.
                  <br />
                  Maximum 30 MB per image.
                </p>
                {formData.images.length > 0 && (
                  <div className="flex flex-row  items-center justify-start gap-2 ">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-end gap-4"
                      >
                        <img
                          src={image}
                          alt="Image Preview"
                          style={{ maxHeight: "50px" }}
                          className="h-auto"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* __________________________DESCRIPTION_____________________ */}
              <div className="form-group">
                <img src="./assets/seal.png" alt="seal" className="w-1/4" />

                <label htmlFor="email">Sealy&apos;s Recommendation:</label>
                <p className="text-gray-600 text-sm py-2 w-full max-w-[600px]">
                  Sealy&apos;s Recommendation is a tool that provides a
                  recommendation for classifying a provided image using
                  Artificial Intelligence. Just upload a photo of the debris to
                  get a recommendation!{" "}
                </p>
                <div>
                  <p>Example Images:</p>
                  <div className="flex flex-row items-center justify-start gap-2 ">
                    {sealyImages.map((image, index) => (
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
                            style={{ maxHeight: "150px" }}
                            className="h-auto"
                            onClick={() => handleSealyClick(index)}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p>
                  Recommended Biofouling Level:
                  <span className="font-semibold" id="sealy-level"></span>
                </p>
                <textarea
                  value={sealyText}
                  disabled
                  id="sealy-text"
                  className="w-full  max-w-[600px] h-12 border-slate-300 border-2 rounded-md p-2 min-h-[500px] max-h-[500px]"
                  style={{
                    resize: "none",
                    overflow: "hidden",
                    minHeight: "200px",
                    maxHeight: "300px",
                  }}
                  rows={50}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* _______________________________DESCRIPTION__________________ */}
        <div className="form-group max-w-[600px] w-full text-black">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full lg:max-w-[700px] h-[100px] p-2 bg-white rounded-sm "
          />
          <div className="text-gray-600 text-sm max-w-[1000px]">
            Providing a detailed description is essential in assessing and
            addressing marine debris effectively. <br />
            Please include information such as: The more details you provide,
            the better we can respond to the report.
          </div>
        </div>
        {/* ________________________________DATE______________________ */}

        <div className="form-group flex flex-row items-center gap-4 text-black">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/*____________________ Captcha Verification ___________________*/}
        {/* <div className="form-group">
          <label htmlFor="captcha">Captcha Verification:</label>
          {/* here we add the reCAPTCHA api stuff from https://www.google.com/recaptcha
          and we use  npm install react-google-recaptcha library */}
        {/* </div> */}
        <div className="form-group">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string}
            onChange={handleCaptchaChange}
          />
        </div>

        <button
          className="bg-green-700 text-white px-5 py-2 rounded-full ml-1
        shadow-lg hover:bg-green-600 transition-all duration-200 ease-in-out scale-110
        hover:translate-y-1 flex flex-row items-center justify-center gap-2 w-[140px]"
          style={{
            background:
              "linear-gradient(220deg, rgba(156,252,142,1) 0%, rgba(46,152,70,1) 28%, rgba(2,10,20,1) 100%)",
          }}
          type="submit"
          disabled={!captchaValue}
        >
          Submit
          <RiMailSendLine className="text-white text-xl" />
        </button>
        <div className="h-[1px] w-full bg-slate-200 my-4"></div>
        <p className="text-gray-600 text-sm py-2 w-full max-w-[800px]">
          Information you submit through this form is shared between divisions
          within DLNR, researchers at the University of Hawaii, NOAA,
          Non-Government Organizations and other agencies that manage marine
          debris and Aquatic Invasive Species. Your contact information is kept
          confidential.
        </p>
      </form>
    </section>
  );
}

export default ReportForm;
