"use client";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

import { DatePickerWithPresets } from "@/components/date-picker";
import { formatDate } from "@/helpers/formatDate";
import { apodService } from "@/services/apod/apod.sevice";
import { ApodType } from "@/types/ApodType";
import { ImagesList } from "@/components/images-list";

export default function Home() {
  const [data, setData] = useState<ApodType>();
  const [date, setDate] = useState<Date | DateRange>();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await apodService.getPicture(date);
      setData(res);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [date]);
  
  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Image
            priority
            className="animate-pulse"
            src="/nasa-logo.png"
            width={500}
            height={500}
            alt="nasa-logo"
          />
        </div>
      )}
      {(data && !isLoading) && (
        <main className="w-full text-center py-4 px-4 animate-appear">
          {!Array.isArray(data) && (
            <>
              <h1 className="text-3xl font-bold">
                Astronomy Picture of the Day
              </h1>
              <p className="my-4">
                Discover the cosmos! Each day a different image or photograph of
                our fascinating universe is featured, along with a brief
                explanation written by a professional astronomer.
              </p>
              <span>{formatDate(data.date)}</span>
              {data.media_type === "image" ? (
                <div className="relative w-fit mx-auto">
                  <Image
                    priority
                    src={data.url}
                    alt="apod_Image"
                    width={970}
                    height={700}
                  />
                  <Link
                    className="p-1 bg-slate-500 opacity-40 hover:opacity-80 rounded-md absolute right-4 top-4"
                    target="blank"
                    href={data.hdurl}
                  >
                    <Search color="#fff" />
                  </Link>
                </div>
              ) : (
                <div className="relative max-w-[960px] max-h-[540px] aspect-video mx-auto">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: "0", left: "0" }}
                    url={data.url}
                  />
                </div>
              )}
              <p className="font-bold mt-3">{data.title}</p>
              <p className="font-bold">
                Image Credit & Copyright: {data.copyright}
              </p>
              <p className="font-bold text-justify my-4">
                Explanation:{" "}
                <span className="font-normal">{data.explanation}</span>
              </p>
            </>
          )}
          {Array.isArray(data) && <ImagesList data={data} setDate={setDate} />}
          <DatePickerWithPresets default={date} setDate={setDate} />
        </main>
      )}
    </>
  );
}
