'use client'
import { IoShareOutline } from "react-icons/io5";
import IconSquare from "./iconSquare";
import { useState } from "react";
import { BsGrid3X3Gap, BsGrid3X3GapFill } from "react-icons/bs";

export default function StatBox() {
  const [isClicked, setIsClicked] = useState(false);
    return (
      <div className="w-full h-full flex flex-col ">
        <div className="h-1/3 w-full flex flex-row gap-[1px]">
            <div className="group w-1/3 h-full flex text-2xl transition-all duration-800 hover:w-2/3">
                <div className="group h-full w-full hover:justify-self-start flex-row flex text-2xl relative border-2 border-orange-500 hover:gap-[1px]">
                    <div className="group-hover:w-1/2 h-full">
                        <IconSquare icon={IoShareOutline} label="share" />
                    </div>

                    {/* Hidden Icon that appears smoothly */}
                    <button className="h-full w-1/2 flex items-center justify-center text-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity group-hover:duration-500 ease-in-out"
                    onClick={() => setIsClicked(!isClicked)} 
                    >
                    {/* <IconSquare icon={BsGrid3X3GapFill} label="current" /> */}
                      <IconSquare
                        icon={isClicked ? BsGrid3X3Gap : BsGrid3X3GapFill}
                        label={isClicked ? 'new' : 'current'}
                      />
                    </button>
                </div>
            </div>
            <div className="w-2/3 flex-1 h-full border-2 border-blue-500 flex items-center justify-center text-2xl transition-all duration-300">
            Err.
            </div>
        </div>
        <div className="h-1/3 w-full flex flex-row gap-[1px]">
          <div className="w-1/3 h-full border-2 border-orange-500 flex items-center justify-center text-2xl transition-all duration-300 hover:w-2/3">
            Str.
          </div>
          <div className="flex-auto text-2xl w-1/3 h-full border-2 border-blue-500 flex items-center justify-center">
            Sc.
          </div> 
        </div>
        <div className="h-1/3 text-2xl w-full flex items-center justify-center border-2 border-red-500">
          Timer
        </div>
      </div>
    );
  }
  
