// import { IconType } from "react-icons";

// type Props = {
//   icon: IconType; // This prop will accept an icon component from react-icons
// };

// export default function IconSquare({ icon: Icon }: Props) {
//   return (
//     <div className="h-full w-full flex place-content-center items-center text-4xl select-none border-2 border-purple-950">
//       <Icon /> {/* Render the icon as a component */}
//     </div>
//   );
// }

import { IconType } from "react-icons";

type Props = {
  icon: IconType; // This prop will accept an icon component from react-icons
  label?: string; // Optional label to display on hover
  handlMe: () => void
};

export default function IconSquare({ icon: Icon, label }: Props) {
  return (
    <div className="w-full h-full aspect-square flex items-center justify-center">
        <div className="bg-white w-[80%] sm:w-[100%] rounded-full items-center justify-center aspect-square">
          <button className="w-full rounded-full aspect-square flex flex-col items-center justify-center text-4xl select-none transition-all duration-300 hover:bg-theme-1-pacific-cyan bg-gray-100 relative group hover:shadow-custom-inner text-theme-1-pacific-cyan hover:text-white"
          onClick={() => {console.log("pressed me")}} 
          >
          <Icon className="transition-transform duration-300 sm:group-hover:text-2xl md:group-hover:text-3xl group-hover:translate-y-[-7px]" />
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