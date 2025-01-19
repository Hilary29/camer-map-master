"use client";

import dynamic from "next/dynamic";
/* import { CircleChart } from "./CircleChart";
import { HorizontalChart } from "./HorizontalChart"; */
import TabChart from "./TabChart";

import { HorizontalChart } from "./HorizontalChart";

const Map = dynamic(() => import("./Map"), { ssr: false });



export default function HeroMap() {

  return (
    <section id="HeroMap">
      <div className=" bg-[url('/img/font.png')] bg-cover bg-center min-h-screen flex flex-col ">
        <div className="mx-24 mt-16 text-black rounded-lg">
          <div className="text-black rounded-lg flex gap-8">
            <div className="text-white flex-1  bg-[#ffffff16]  rounded-md p-2">
              <div className="max-w-5xl h-[600px] mx-auto">
                <Map/> 
              </div>
            </div>
            <div className="">
            <HorizontalChart/>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
