'use client'

import { useState } from "react";
import { IconType } from "react-icons";


type Props = {
  icon: IconType; // This prop will accept an icon component from react-icons
  pressedIcon: IconType; // Icon to display when pressed
  label?: string; // Optional label to display on hover
  handleMe: () => void; // Click handler
  isToggle?: boolean; // Optional prop to toggle state behavior
  keyBoardClick?: boolean;
};

export default function IconSquare({ icon: Icon, pressedIcon: PressedIcon, label, handleMe, isToggle = false, keyBoardClick = false }: Props) {
  const [clicked, setClicked] = useState(false)

  // const handleClick = () => {
  //   setClicked(!clicked);
  //   handleMe();
  // };
  // useEffect(() => {
  //   handleClick()
  // }, [keyBoardClick])

  const handleClick = () => {
    if (isToggle) {
      setClicked(!clicked); // Toggle the clicked state if isToggle is true
    } else {
      setClicked(true);
      setTimeout(() => setClicked(false), 200); // Momentary effect when isToggle is false
    }
    handleMe();
  };

  return (
    <div className="select-none w-full h-full aspect-square flex items-center justify-center">
        <div className="bg-white w-[80%] sm:w-[100%] rounded-full items-center justify-center aspect-square">
          <button className={`w-full rounded-full aspect-square flex flex-col items-center justify-center text-4xl select-none transition-all duration-300  ${(clicked || keyBoardClick) ? 'text-white bg-theme-1-pacific-cyan' : 'text-theme-1-pacific-cyan bg-gray-100 hover:bg-gray-200'} relative group hover:shadow-custom-inner`}
          onClick={handleClick} 
          >
          {/* <Icon className="transition-transform duration-300 sm:group-hover:text-2xl md:group-hover:text-3xl group-hover:translate-y-[-7px]" /> */}
          {clicked ? (
            <PressedIcon className="transition-transform duration-300 sm:group-hover:text-2xl md:group-hover:text-3xl group-hover:translate-y-[-7px]" />
          ) : (
            <Icon className="transition-transform duration-300 sm:group-hover:text-2xl md:group-hover:text-3xl group-hover:translate-y-[-7px]" />
          )}
          {label && (
              <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:mt-2 sm:text-xs md:text-sm lg:text-lg bottom-2 ">
              {label}
              </span>
          )}
          </button>
        </div>
    </div>
  );
}