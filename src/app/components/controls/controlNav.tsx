// import { BsEraser, BsEraserFill } from "react-icons/bs";
import { IoBackspaceOutline, IoBackspace } from "react-icons/io5";
import {IoArrowUndoOutline,IoArrowUndo } from "react-icons/io5";
import {PiLightbulb, PiLightbulbFill, 
        PiPencilSimple, PiPencilSimpleFill, PiNotePencil,
        PiRepeat, PiRepeatDuotone,
        PiArrowBendUpLeft,PiArrowBendDownLeft } from "react-icons/pi";
import { GrUndo } from "react-icons/gr";
import { TbArrowBackUp } from "react-icons/tb";
import { TbBackground } from "react-icons/tb";

import IconSquare from "./iconSquare";
import NumberPad from "./numberPad";

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
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-12 border-2 border-theme-2-berkeley-blue p-4 mb-1">
                timer, mistakes
            </div>
            <div className="top-12 h-full flex flex-col">
                <div className="w-full h-1/3 flex flex-col flex-none border-2 border-theme-2-berkeley-blue gap-[2px] bg-theme-2-berkeley-blue">
                    <div className="h-2/3 bg-white">
                        <div className="grid grid-cols-3 flex-none gap-[1px] w-full h-full bg-theme-1-cerulean/50">
                            <IconSquare icon={PiPencilSimple} label="note" />
                            <IconSquare icon={PiNotePencil} label="auto" />
                            <IconSquare icon={PiLightbulb} label="hint" />
                            <IconSquare icon={IoBackspaceOutline} label="erase" />
                            <IconSquare icon={PiArrowBendDownLeft} label="undo" />
                            <IconSquare icon={PiRepeat} label="restart" />
                        </div>
                    </div>
                    <div className="w-full flex-grow justify-center flex items-center text-2xl bg-green-400 hover:bg-green-300">
                        PLAY
                    </div>
                </div>
                <div className="w-full h-1/3 aspect-square flex-none border-2 border-red-400">
                    <NumberPad />
                </div>
                <div className="w-full h-1/3 flex-none border-2 border-green-400">

                </div>
            </div>
        </div>
    );
  }
  