'use client'
import { useContext } from 'react';
import Square from './square';
import { BoardContext, GameContext } from '@/lib/context';

export default function Board() {
  const { boardValues } = useContext(BoardContext);
  const { selectedCell, highlightedCells } = useContext(GameContext);

  const getBorderClasses = (index: number) => {
    const isTopBold = index < 9;
    const isBottomBold = index >= 72;
    const isLeftBold = index % 9 === 0;
    const isRightBold = (index + 1) % 9 === 0;
    const isVerticalBold = index % 3 === 0;
    const isHorizontalBold = Math.floor(index / 9) % 3 === 0;

    return `
      ${isTopBold || isHorizontalBold ? 'border-t-4' : 'border-t'}
      ${isBottomBold ? 'border-b-4' : 'border-b'}
      ${isLeftBold || isVerticalBold ? 'border-l-4' : 'border-l'}
      ${isRightBold ? 'border-r-4' : 'border-r'}
    `;
  };

  const getBackgroundClasses = (index: number) => {
    const selectedCellBG = 'bg-theme-1-pacific-cyan/65 shadow-custom-inner'
    if (highlightedCells.sameNumbers.includes(index)) {
      return index !== selectedCell 
      ? 'bg-theme-1-pacific-cyan/50 shadow-custom-inner'
      : selectedCellBG

    }
    // else if (highlightedCells.shadowBlock.includes(index)) {
    //   // pass since we need to handle in square component
    // }
    else if (highlightedCells.neighborhood.includes(index)) {
      return index === selectedCell
        ? selectedCellBG
        : 'bg-theme-1-pacific-cyan/30'
    }
    return 'bg-white-3'
  };

  const squares = boardValues.map((_, index) => (
    <div
      key={index}
      className={`border-1 border-theme-2-berkeley-blue w-full h-full
        ${getBackgroundClasses(index)} aspect-square flex items-center justify-center ${getBorderClasses(index)}`}
    >
      <Square uid={index} />
    </div>
  ));

  return (
    <div className='grid grid-cols-9 w-full border-4 border-theme-2-berkeley-blue rounded-md'>
      {squares}
    </div>
  );
}
