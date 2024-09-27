'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DifficultySelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [time, setTime] = useState<number>(0); // Timer in seconds

  // Start the timer as soon as the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Sync the difficulty from the URL on initial load
  useEffect(() => {
    const currentPath = pathname.split('/')[1]; // Get the difficulty from the URL
    if (currentPath) {
      const formattedLevel = capitalize(currentPath); // Capitalize the first letter
      setSelectedLevel(formattedLevel); // Set the level as the selected state
    }
  }, [pathname]); // Update when the pathname changes

  // Function to capitalize the first letter
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Function to format time as mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const difficulties = ['Easy', 'Medium', 'Hard', 'Unfair', 'Extreme'];

  // Function to handle difficulty selection
  const handleDifficultySelection = (level: string) => {
    setSelectedLevel(level); // Update the state first
    router.push(`/${level.toLowerCase()}`); // Push the new URL to the router
  };

  return (
    <div className="flex h-12 w-full items-center justify-between border-4 border-black p-2">
      {/* Timer */}
      <div className="text-lg font-bold text-gray-600">
        {`${formatTime(time)}`}
      </div>
      
      {/* Difficulty Selection */}
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => handleDifficultySelection(level)}
          className={`select-none text-lg ${
            selectedLevel === level
              ? 'text-blue-600' // Selected difficulty
              : 'font-normal text-gray-500 hover:text-gray-700' // Unselected difficulties
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
