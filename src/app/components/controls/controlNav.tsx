import { BsEraser, BsEraserFill } from "react-icons/bs";
import {IoArrowUndoOutline,IoArrowUndo } from "react-icons/io5";
import {PiLightbulb, PiLightbulbFill, PiPencilSimpleLine, PiPencilSimpleLineFill } from "react-icons/pi";
import { TbBackground } from "react-icons/tb";

import IconSquare from "./iconSquare";

export default function ControlNav() {
  return (
    <div className="flex h-full flex-col">
        <div className="h-12 w-full border-4 border-purple-500">
            share, timer, mistakes
        </div>
        <div className="w-full h-full flex flex-col justify-stretch ">
            <div className="w-full h-full md:grid md:grid-cols-2 gap-[1px] border-spacing-4 border-blue-500">
                <IconSquare icon={BsEraser} />
                <IconSquare icon={IoArrowUndoOutline} />
                <IconSquare icon={PiPencilSimpleLine} />
                <IconSquare icon={PiLightbulb}/>
                {/* hello */}
            </div>
            <div className="h-full border-4 border-yellow-500">
                number pad
            </div>
            <div className="h-full border-4 border-blue-500">
                Square coloring in
            </div>
        </div>
    </div>
  )
}
