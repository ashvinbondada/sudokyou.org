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
    else if (highlightedCells.neighborhood.includes(index)) {
      return index === selectedCell
        ? selectedCellBG
        : 'bg-theme-1-pacific-cyan/30'
    }

    return 'bg-white'
  };
  const getShadowClass = (index: number) => {
    // Find the block in shadowBlock
    const shadowBlockItem = highlightedCells.shadowBlock.find(block => block.index === index);
    
    if (!shadowBlockItem) {
      return ''; // Default to no shadow if the index is not in shadowBlock
    }
  
    // Apply shadow based on the direction 
    // TODO: have not figured out corners properly.
    switch (shadowBlockItem.direction) {
      case 'top':
        return 'shadow-[0px_-5px_10px_rgba(0,0,0,0.2)_inset]'; // Shadow to top
      case 'left':
        return 'shadow-[-5px_0px_10px_rgba(0,0,0,0.2)_inset]'; // Shadow to left
      case 'right':
        return 'shadow-[5px_0px_10px_rgba(0,0,0,0.2)_inset]'; // Shadow to right
      case 'bottom':
        return 'shadow-[0px_5px_10px_rgba(0,0,0,0.2)_inset]'; // Shadow to bottom
      default:
        return ''; // Default to no shadow
    }
  };


  const squares = boardValues.map((_, index) => (
    <div
      key={index}
      className={`border-theme-2-berkeley-blue w-full h-full transition-colors duration-300 ease-in-out
        ${getBackgroundClasses(index)} ${getShadowClass(index)} aspect-square flex items-center justify-center ${getBorderClasses(index)}`}
    >
      <Square uid={index} />
    </div>
  ));

  return (
    <div className='grid grid-cols-9 w-full border-4 border-theme-2-berkeley-blue'>
      {squares}
    </div>
  );
}
