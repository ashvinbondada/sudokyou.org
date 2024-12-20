'use client'
import { useContext, useEffect,} from 'react';
import Square from './square';
import { BoardContext } from '@/lib/context';

export default function Board() {
  const { boardValues } = useContext(BoardContext);

  useEffect( () => {
  }, [boardValues])
  // Generate the squares
  const squares = boardValues.map((_, index) => (
    <div
      key={index}
      className={`w-full h-full
        aspect-square flex items-center justify-center
        
        `}
    >
      <Square uid={index} />
    </div>
  ));

  // Group squares into 3x3 grids (3 rows, 3 cols)
  const blocks: React.ReactNode[][] = [];
  // Loop through each row of the board
  for (let row = 0; row < 9; row++) {
    // Determine which block this row belongs to (3 blocks per row of blocks)
    const currentBlockRow = Math.floor(row / 3);
  
    // Fill each block in the current block row
    for (let blockInRow = 0; blockInRow < 3; blockInRow++) {
      const blockIndex = currentBlockRow * 3 + blockInRow;
  
      // Initialize block if not already created
      if (!blocks[blockIndex]) {
        blocks[blockIndex] = [];
      }
  
      // Fill 3 squares from the current row into this block
      for (let i = 0; i < 3; i++) {
        const squareIndex = row * 9 + blockInRow * 3 + i;
        blocks[blockIndex].push(squares[squareIndex]);
      }
    }
  }
  
  // Map the filled blocks into the grid
  const blockDivs = blocks.map((blockSquares, block) => (
    // div responsible for blocking thick grid line from mixing
    // with thin grid lines
    <div key={block} className='bg-white rounded-sm'>
    {/* // div responsible for the grid lines between squares */}
      <div  className="grid grid-cols-3 gap-[1px] bg-light-grid-line rounded-sm">
          {blockSquares}
      </div>
    </div>
  ));

  return (
    // Outer grid for the 3x3 blocks, responsible for the border thickness and color
    <div className='p-[3px] bg-light-grid-line rounded-sm'>
      {/* div responsible for the color and thickness of grid lines */}
        <div className='grid grid-cols-3 gap-[3px] bg-light-grid-line rounded-sm'>
          {blockDivs}
        </div>
    </div>
  );
}
