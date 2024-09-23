import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="w-full border-b-2 border-theme-2-berkeley-blue dark:border-b-anti-flash-white">
        <nav className="w-[60%] h-16 mx-auto flex justify-center lg:justify-between md:justify-between sticky top-0 dark:bg-smoky-black px-1
        backdrop-blur-xl shadow-b-md text-theme-2-berkeley-blue">
            <h1 className="text-3xl font-bold text-white grid items-center mb-2 md:mb-0">
            <Link href="/" className="dark:text-dun text-theme-2-berkeley-blue hover:opacity-90 no-underline">sudokyou.org</Link>
            </h1>
            <div className="flex flex-row items-center sm:justify-evenly align-middle gap-4 text-white text-3xl">
            <Link className="hidden md:block lg:block" href="https://github.com/ashvinbondada/sudokyou.org">
                <FaGithub className="dark:text-dun text-theme-2-berkeley-blue hover:opacity-90"/>
            </Link>
            </div>
        </nav>
    </div>
  );
}
