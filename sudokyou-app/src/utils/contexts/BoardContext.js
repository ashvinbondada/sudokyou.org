import { createContext } from "react";

export const BoardContext = createContext({
    isShiftDown: false,
    inputValue: undefined,
    boardValues: Array(81).fill(
        {
            isEditable: false, 
            squareValue: '',
            squareNotes: Array(9).fill(undefined)
        }
    ), 
    setBoardContext: () => {}
})


// ADD THESE PROPERTIES LATER:
/*
    1. selected cell
    2. game status
    3. timer
    4. highlighted numbers
    5. initial board values
    6. mistakes count
    7. notes mode
    8. history
    9. difficulty
*/