'use client'
import { useState } from 'react';

export default function Instructions() {
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const keys = [
    { char: 'q', number: 1 },
    { char: 'w', number: 2 },
    { char: 'e', number: 3 },
    { char: 'a', number: 4 },
    { char: 's', number: 5 },
    { char: 'd', number: 6 },
    { char: 'z', number: 7 },
    { char: 'x', number: 8 },
    { char: 'c', number: 9 },
  ];

  return (
    <div className="h-full lg:w-[256px] md:flex-none hidden lg:block p-4 select-none">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Sudoku Rules</h1>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>Each row must contain the numbers 1-9, without repetition.</li>
        <li>Each column must contain the numbers 1-9, without repetition.</li>
        <li>Each 3x3 sub-grid must contain the numbers 1-9, without repetition.</li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Keyboard Instructions</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>Numbers (1-9) can be used for input.</li>
        <li><strong>n</strong> - Toggle notes mode.</li>
        <li><strong>u</strong> - Undo a move.</li>
        <li><strong>Backspace</strong> - Clear a square.</li>
        <li><strong>hjkl (vim)</strong> or <strong>arrow keys</strong> - Move around the board.</li>
        <li>
          Use these keys to input (1-9) numbers:
          <div className="flex flex-col items-center mt-2 space-y-1">
            <div className="flex space-x-2">
              {keys.slice(0, 3).map((key) => (
                <div
                  key={key.char}
                  className="bg-gray-100 text-theme-1-pacific-cyan p-2 rounded text-center cursor-pointer hover:bg-gray-200 transition duration-300"
                  onMouseEnter={() => setHoveredKey(key.char)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {hoveredKey === key.char ? key.number : key.char}
                </div>
              ))}
            </div>
            <div className="ml-4 flex space-x-2">
              {keys.slice(3, 6).map((key) => (
                <div
                  key={key.char}
                  className="bg-gray-100 text-theme-1-pacific-cyan p-2 rounded text-center cursor-pointer hover:bg-gray-200 transition duration-300"
                  onMouseEnter={() => setHoveredKey(key.char)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {hoveredKey === key.char ? key.number : key.char}
                </div>
              ))}
            </div>
            <div className="ml-8 flex space-x-2">
              {keys.slice(6, 9).map((key) => (
                <div
                  key={key.char}
                  className="bg-gray-100 text-theme-1-pacific-cyan p-2 rounded text-center cursor-pointer hover:bg-gray-200 transition duration-300"
                  onMouseEnter={() => setHoveredKey(key.char)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {hoveredKey === key.char ? key.number : key.char}
                </div>
              ))}
            </div>
          </div>
        </li>
        <li><strong>Shift</strong> - Temporarily toggle notes mode when held down.</li>
      </ul>
    </div>
  );
}
