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
};

export default function IconSquare({ icon: Icon, label }: Props) {
  return (
    <div className="bg-white">
        <div className="h-full w-full aspect-square flex flex-col items-center justify-center text-4xl select-none transition-all duration-300 hover:bg-theme-1-pacific-cyan/30 bg-gray-100 relative group hover:shadow-custom-inner">
        <Icon className="transition-transform duration-300 group-hover:text-2xl group-hover:translate-y-[-10px]" />
        {label && (
            <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:mt-2 text-base bottom-0">
            {label}
            </span>
        )}
        </div>
    </div>
  );
}