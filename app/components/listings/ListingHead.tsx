"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Slider from "react-slick";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  otherImages: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue, imageSrc, otherImages, id, currentUser }) => {
  const { getByValue } = useCountries();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const location = getByValue(locationValue);

  const images = [imageSrc, ...otherImages];

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="relative">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
            >
              <Image src={image} fill className="object-cover w-full" alt="Image" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ListingHead;
