'use client'
// import { BsEraser, BsEraserFill } from "react-icons/bs";
import { IoBackspaceOutline, IoBackspace, IoSettingsOutline, IoSettings } from "react-icons/io5";
import {IoArrowUndoOutline,IoArrowUndo } from "react-icons/io5";
import {PiLightbulb, PiLightbulbFill, 
        PiPencilSimple, PiPencilSimpleFill, PiNotePencil,
        PiRepeat, PiRepeatDuotone,
        PiArrowBendUpLeft,PiArrowBendDownLeft, PiQuestion, 
        PiQuestionFill} from "react-icons/pi";
import { GrUndo } from "react-icons/gr";
import { TbArrowBackUp } from "react-icons/tb";
import { TbBackground } from "react-icons/tb";

import IconSquare from "./iconSquare";
import NumberPad from "./numberPad";
import StatBox from "./statBox";
import NumPadSquare from "./numberTile";
import ShareSquare from "./shareSquare";
import { useState } from "react";

// export default function ControlNav() {
//   return (
//     <div className="flex h-full flex-col">
//         <div className="h-12 w-full border-4 border-purple-500">
//             share, timer, mistakes
//         </div>
//         <div className="w-full h-full flex flex-col justify-stretch ">
//             {/* #1 UTILITIES */}
//             <div className="w-full h-full md:grid md:grid-rows-3 gap-[1px] border-4 border-blue-500">
//                 <div className="w-full h-full flex flex-row gap-[1px]">
//                     {/* <IconSquare icon={IoArrowUndoOutline} /> */}
//                     <IconSquare icon={PiPencilSimple} label="note" />
//                     <IconSquare icon={PiNotePencil} label="auto"/>
//                     <IconSquare icon={PiLightbulb} label="hint"/>
//                 </div>
//                 <div className="w-full h-full flex flex-row gap-[1px]">
//                     <IconSquare icon={IoBackspaceOutline} label="erase" />
//                     <IconSquare icon={GrUndo} label="undo" />
//                     <IconSquare icon={PiRepeat} label="restart" />

//                 </div>
//                 <div className="border-4 border-green-400">
//                     PLAY/PAUSE
//                 </div>
//                 {/* hello */}
//             </div>

//             {/* #2 NUMBER PAD */}
//             <div className="h-full border-4 border-yellow-500">
//                 number pad
//             </div>

//              {/* #3 SHARING, COLLAB, PRINT */}
//             <div className="h-full border-4 border-blue-500">
//                 Square coloring in
//             </div>
//         </div>
//     </div>
//   )
// }

export default function ControlNav() {
    const [isSettingsClicked, setIsSettingsClicked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className="h-full w-full flex flex-col">
            {/* border goes here */}
            <div className="p-2 w-full h-12 flex flex-row items-center justify-center">
                <div className="w-full h-12 aspect-square flex rounded-md overflow-hidden">
                {/* Share Button */}
                <button className="w-2/3 flex items-center justify-center text-white text-xl transition-all duration-300"
                onClick={() => setIsClicked(!isClicked)} 
                >
                {isClicked ? <ShareSquare icon={PiQuestionFill} label="help"/> : <ShareSquare icon={PiQuestion} label="help"/>}
                </button>

                {/* Grid Button */}
                <button
                    className="flex-1 flex items-center justify-center transition-all duration-300 border-l-2 border-theme-1-pacific-cyan"
                    onClick={() => setIsSettingsClicked(!isSettingsClicked)}
                >
                    {isSettingsClicked ? <ShareSquare icon={IoSettings} label="settings"/> : <ShareSquare icon={IoSettingsOutline} label="settings"/>}
                </button>
                </div>
            </div>
            
            {/* border goes here */}
            <div className="top-12 h-full flex flex-col">
                <div className="w-full h-1/3 flex flex-col flex-none gap-[2px]">
                    <div className="h-full bg-transparent">
                        <div className="grid grid-cols-3 flex-none gap-2 w-full h-full p-2">
                            <IconSquare icon={PiPencilSimple} label="notes" />
                            <IconSquare icon={PiNotePencil} label="auto" />
                            <IconSquare icon={PiLightbulb} label="hints" />
                            <IconSquare icon={IoBackspaceOutline} label="delete" />
                            <IconSquare icon={PiArrowBendDownLeft} label="undo" />
                            <IconSquare icon={PiRepeat} label="restart" />
                        </div>
                    </div>
                </div>
                {/* <div className="px-2 w-full h-1/3 flex items-center justify-center flex-none border-t-[1px] border-b-[1px] border-theme-2-berkeley-blue">
                        <NumberPad />
                </div> */}
                <div className="p-2 grid grid-cols-3 h-1/3 gap-2">
                    <NumPadSquare squareValue={1} quantity={0} />
                    <NumPadSquare squareValue={2} quantity={0} />
                    <NumPadSquare squareValue={3} quantity={0} />
                    <NumPadSquare squareValue={4} quantity={0} />
                    <NumPadSquare squareValue={5} quantity={0} />
                    <NumPadSquare squareValue={6} quantity={0} />
                    <NumPadSquare squareValue={7} quantity={0} />
                    <NumPadSquare squareValue={8} quantity={0} />
                    <NumPadSquare squareValue={9} quantity={0} />
                </div>


                <div className="w-full h-1/3 flex-none">
                    <StatBox />
                </div>
            </div>
        </div>
    );
  }
  