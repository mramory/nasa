import Image from "next/image";
import ReactPlayer from "react-player";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

import { formatDate } from "@/helpers/formatDate";
import { ApodType } from "@/types/ApodType";

interface ImagesListProps {
  data: ApodType[];
  setDate: Dispatch<SetStateAction<Date | DateRange | undefined>>;
}

export const ImagesList = ({ data, setDate }: ImagesListProps) => {
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-10 mb-4">
      {data.map((el: ApodType) => (
        <div
          key={el.date}
          onClick={() => setDate(new Date(el.date))}
          className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33%-8px)] 2xl:w-[calc(25%-12px)] cursor-pointer"
        >
          <p className="font-semibold">{el.title}</p>
          <div className="relative w-full h-[380px]">
            {el.media_type === "image" ? (
              <Image
                src={el.url}
                alt="img"
                fill
                className="absolute object-cover"
              />
            ) : (
              <ReactPlayer
                width="100%"
                height="100%"
                loop
                playing
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  top: "0",
                  left: "0",
                }}
                url={el.url}
              />
            )}
          </div>
          <p>{formatDate(el.date)}</p>
        </div>
      ))}
    </div>
  );
};
