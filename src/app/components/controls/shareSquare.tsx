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

export default function ShareSquare({ icon: Icon, label }: Props) {
  return (
    // <div className="w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center lg:text-4xl md:text-3xl sm:text-xl select-none transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 relative group hover:shadow-custom-inner text-theme-1-pacific-cyan">
          <Icon className="transition-transform duration-300 md:group-hover:text-2xl sm:group-hover:text-xl group-hover:translate-y-[-8px]" />
          {label && (
              <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:mt-2 sm:text-xs md:text-sm lg:text-base bottom-0">
              {label}
              </span>
          )}
          </div>
        </div>
    // </div>
  );
}