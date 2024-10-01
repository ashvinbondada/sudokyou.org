'use client'
import { IoShareOutline } from "react-icons/io5";
import { useState } from "react";
import { BsGrid3X3Gap, BsGrid3X3GapFill } from "react-icons/bs";
import ShareSquare from "./shareSquare";
import NumPadSquare from "./numberTile";

export default function StatBox() {
  const [isClicked, setIsClicked] = useState(false);
    return (
      <div className="w-full h-full flex flex-col ">
        <div className="h-1/3 w-full flex flex-row p-1 md:p-2">
            <div className="w-full h-full flex rounded-md overflow-hidden">
              {/* Share Button */}
              <button className="w-2/3 flex items-center justify-center text-white text-xl transition-all duration-300">
                <ShareSquare icon={IoShareOutline} label="share"/>
              </button>

              {/* Grid Button */}
              <button
                className="flex-1 flex items-center justify-center transition-all duration-300 border-l-2 border-theme-1-pacific-cyan"
                onClick={() => setIsClicked(!isClicked)}
              >
                {isClicked ? <ShareSquare icon={BsGrid3X3GapFill} label="new"/> : <ShareSquare icon={BsGrid3X3Gap} label="current"/>}
              </button>
            </div>
        </div>
        <div className="h-1/3 p-2 w-full flex flex-row">
          <div className="w-full h-full bg-theme-1-pacific-cyan rounded-md flex flex-row items-center justify-center">
            {/* <div className="w-1/2 h-full flex items-center justify-center">
              <NumPadSquare squareValue={1234}/>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <NumPadSquare squareValue={1.4}/>
            </div> */}
            progress bar
          </div>
        </div>
        <div className="w-full h-1/3 p-2">
              <div className="w-full h-full bg-theme-1-pacific-cyan rounded-md flex justify-center items-center">
                timer
              </div>
        </div>
      </div>
    );
  }
  
