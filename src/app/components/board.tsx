'use client'
import { useContext } from 'react';
import Square from './square'; // Assuming you have a Square component
import { BoardContext } from '@/lib/context';

export default function Board() {
  const {boardValues} = useContext(BoardContext)

  // Generate an array of 81 Square components
  // const squares = Array.from({ length: 27 }, (_, index) => {
  const squares = boardValues.map((_, index) => {
  
  
  
  // })
    const isTopBold = index < 9; // First row
    const isBottomBold = index >= 72; // Last row
    const isLeftBold = index % 9 === 0; // First column of each row
    const isRightBold = (index + 1) % 9 === 0; // Last column of each row
    const isVerticalBold = index % 3 === 0; // Every 3rd column (for vertical bold lines)
    const isHorizontalBold = Math.floor(index / 9) % 3 === 0; // Every 3rd row (for horizontal bold lines)

    const borderClasses = `
      ${isTopBold || isHorizontalBold ? 'border-t-4' : 'border-t'} 
      ${isBottomBold ? 'border-b-4' : 'border-b'} 
      ${isLeftBold || isVerticalBold ? 'border-l-4' : 'border-l'} 
      ${isRightBold ? 'border-r-4' : 'border-r'}
    `;

    return (
      <div
        key={index}
        className={`border-1 border-theme-2-berkeley-blue bg-theme-2-honeydew w-full h-full hover:bg-theme-2-non-photo-blue aspect-square flex items-center justify-center ${borderClasses}`}
      >
        <Square uid={index}/>
      </div>
    );
  });

  return (
    <div className='grid grid-cols-9 w-full'>
      {squares}
    </div>
  );
}
