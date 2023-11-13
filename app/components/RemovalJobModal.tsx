
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";


interface FormData {
  id: string;
  debrisApproxSize: string;
  environmentalDamage: string;
}

interface RemovalJobModalProps {
  onSubmit: () => void;
  onClose: () => void;
  job: string;
}

interface RemovalFormData {
  id: string;
  environmentalDamage: string;
  debrisApproxSize: string;
}

function RemovalJobModal({ onSubmit, onClose, job }: RemovalJobModalProps) {
  const [formData, setFormData] = useState<RemovalFormData>({
    id: "",
    environmentalDamage: "",
    debrisApproxSize: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append("id", job.split("-")[1]);
    form.append("environmentalDamage", formData.environmentalDamage);
    form.append("debrisApproxSize", formData.debrisApproxSize);
    form.append("status", "removed");

    // Example: send formData to the server
    try {
      const response = await fetch("/api/report", {
        method: "PATCH",
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
    onSubmit();

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
    <div
      className="bg-gray-50 flex flex-col fixed top-1/2 left-1/2 transform rounded-md
    -translate-x-1/2 -translate-y-1/2 max-w-full w-1/3 h-fit z-50 shadow-2xl p-6 "
    >
      <button className="absolute top-2 right-2 text-black" onClick={onClose}>
        {" "}
        <FaTimes className="text-pink-700 text-sm hover:scale-110" />
      </button>
      <h1 className="text-black font-bold self-center justify-center">
        Removal Job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-4 mt-4"
      >
        <label className="text-black" htmlFor="name">
          Describe the debris removal
        </label>
        <div className="form-group flex flex-row items-center gap-4 w-fit">
          <label htmlFor="text">Debris Approx Size (in kgs):</label>
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
          type="submit"
          className="text-black  self-end  text-sm  bg-yellow-500 rounded-full
        shadow-md px-3 py-1 mt-4"
        >
          Submit
        </button>
        <div className="h-[.5px] w-full bg-yellow-700/40"> </div>
        <p className="text-slate-700 text-[.7rem]">
          When assigning this task to the specified removal company mentioned
          above, an automatic notification will be sent out across the network,
          including the WhatsApp group chat.
        </p>
      </form>
    </div>
  );
}

export default RemovalJobModal;
