import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { galleryItems } from "./page";

export default function GalleryPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gallery</h1>
        <div className="grid grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-2">
              <Image
                src={item.imagePath}
                height={330}
                width={500}
                alt={item.title}
                className="w-full h-auto"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
