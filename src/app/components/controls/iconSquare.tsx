import { IconType } from "react-icons";

type Props = {
  icon: IconType; // This prop will accept an icon component from react-icons
};

export default function IconSquare({ icon: Icon }: Props) {
  return (
    <div className="h-full w-full flex place-content-center items-center text-4xl select-none border-2 border-purple-950">
      <Icon /> {/* Render the icon as a component */}
    </div>
  );
}
