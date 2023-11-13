"use client";
import { useState } from "react";

// TODO: Change this
interface RemovalFormData {
  detectionDate: string;
  detectionLocation: string;
  environmentalDamage: string;
  debrisType: string;
  debrisApproxSize: string;
}

export default function RemovalForm() {
  const [formData, setFormData] = useState<RemovalFormData>({
    detectionDate: "",
    detectionLocation: "",
    environmentalDamage: "",
    debrisType: "",
    debrisApproxSize: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("detectionDate", formData.detectionDate);
    form.append("detectionLocation", formData.detectionLocation);
    form.append("environmentalDamage", formData.environmentalDamage);
    form.append("debrisType", formData.debrisType);
    form.append("debrisApproxSize", formData.debrisApproxSize);

    // Example: send formData to the server
    try {
      const response = await fetch("/api/remove", {
        method: "POST",
        body: form,
      });
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-2
      border-slate-500/30 border-2 rounded-md shadow-2xl p-6  md:p-8 bg-white/90 text-black w-fit"
      >
        <h2 className=" font-medium text-2xl self-center">Removal Form</h2>
        <div className="flex flex-row items-start justify-between md:gap-12 ">
        <div className="mr-8">
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="date">Detection Date:</label>
          <input
            className="text-black"
            type="date"
            id="detectionDate"
            name="detectionDate"
            value={formData.detectionDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="text">Detection Location:</label>
          <input
            className="text-black"
            type="text"
            id="detectionLocation"
            name="detectionLocation"
            value={formData.detectionLocation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="text">Debris Type:</label>
          <input
            className="text-black"
            type="text"
            id="debrisType"
            name="debrisType"
            value={formData.debrisType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="text">Debris Approx Size:</label>
          <input
            className="text-black"
            type="text"
            id="debrisApproxSize"
            name="debrisApproxSize"
            value={formData.debrisApproxSize}
            onChange={handleChange}
          />
        </div>
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="text">Environmental Damage:</label>
            <textarea
              id="environmentalDamage"
              name="environmentalDamage"
              value={formData.environmentalDamage}
              onChange={handleChange}
              className="w-full lg:max-w-[700px] h-[200px] p-2 bg-white rounded-sm text-black "
            />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md
        shadow-lg hover:bg-green-700 transition-all duration-200 ease-in-out"
          type="submit"
        >
          Submit Report
        </button>
        </div>
        </div>
      </form>
    </section>
  );
}
