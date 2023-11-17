import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

// Mock data for gallery items
const galleryItems = [
  {
    title: "Bugula Neritina",
    description: "Bugula neritina (Linnaeus, 1758)",
    imagePath: "/gallery/bugula.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=709&pic=166270",
  },
  {
    title: "Codium Bursa",
    description: "Codium bursa (Olivi) C.Agardh, 1817",
    imagePath: "/gallery/codium-bursa.jpg",
    imageURL:
      "https://www.marinespecies.org/aphia.php?p=image&tid=111355&pic=3597",
  },
  {
    title: "Electra Pilosa",
    description: "Electra pilosa (Linnaeus, 1767)",
    imagePath: "/gallery/electra-pilosa.jpg",
    imageURL:
      "https://www.marinespecies.org/aphia.php?p=image&tid=111355&pic=3597",
  },
  {
    title: "Hildenbrandia Rubra",
    description: "Hildenbrandia rubra (Sommerfelt) Meneghini, 1841",
    imagePath: "/gallery/hildenbrandia.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=766&pic=166388",
  },
  {
    title: "Open Polyps",
    description:
      "HThis image shows a colony of open polyps on top of a black  coral from Palau.",
    imagePath: "/gallery/open-polyps.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=5552&pic=130255",
  },
  {
    title: "Oyster Thief - Codium fragile (Suringar) Hariot",
    description:
      "Picture taken in Deming Island (45°12'43.46''N, 61°10'25.40''W), Nova Scotia on 25 August 2017.",
    imagePath: "/gallery/oyster-thief.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=770&pic=126853",
  },
  {
    title: "Thylacodes Vandyensis",
    description:
      "Body removed from the shell - \n Thylacodes vandyensis Bieler, Rawlings & T. M. Collins, 2017",
    imagePath: "/gallery/oyster-thief.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=5552&pic=130238",
  },
  {
    title: "Tricleocarpa Fragilis",
    description:
      "Tricleocarpa fragilis (Linnaeus) Huisman & R.A.Townsend, 1993",
    imagePath: "/gallery/tricleocarpa.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=766&pic=48557",
  },
  {
    title: "Ulva",
    description: "Ulva Linnaeus, 1753",
    imagePath: "/gallery/ulva.jpg",
    imageURL:
      "https://www.marinespecies.org/photogallery.php?album=770&pic=40238",
  },
];

export default function GalleryPage() {
  return (
    <div className="h-fit custom-background">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <div className="grid grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <a key={index} href={item.imageURL} target="_blank">
              <div
                key={index}
                className="text-white border bg-white-500/75 rounded-lg p-2"
              >
                <h1 className="text-xl font-semibold p-2">{item.title}</h1>
                <Image
                  src={item.imagePath}
                  height={330}
                  width={500}
                  alt={item.title}
                  className="w-full h-auto"
                />
                <p className="p-2">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
