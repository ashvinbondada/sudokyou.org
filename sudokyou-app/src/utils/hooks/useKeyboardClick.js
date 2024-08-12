// responsible for handling number clicks
// and sending them to the Board component, which
// will propogate this down
import { useEffect, useState } from "react";

export function useShiftClick() {
   const [shiftDown, setShiftDown] = useState(false);
    useEffect(() => {

        const handleShiftDown = (e) => {
            if (e.key == 'Shift') {
                e.preventDefault();
                setShiftDown(true);
            }
        }

        const handleShiftUp = (e) => {
            if (e.key == 'Shift') {
                setShiftDown(false);
            }
        }

        window.addEventListener('keydown', handleShiftDown);
        window.addEventListener('keyup', handleShiftUp);

        return () => {
            window.removeEventListener('keydown', handleShiftDown);
            window.removeEventListener('keyup', handleShiftUp);
        }
    }, []);

    return shiftDown
}


export function useKeyboardClick() {
    const [keyDown, setKeyDown] = useState();

    useEffect(() => {
        const handleKeyDown = (e) => {
            // console.log("pressed", e.key);
            switch (e.key) {
                case 'q':
                case 'Q':
                case '1':
                    setKeyDown(1);
                    break;
                
                case 'w':
                case 'W':
                case '2':
                    setKeyDown(2);
                    break;
                
                case 'e':
                case 'E':
                case '3':
                    setKeyDown(3);
                    break;

                case 'a':
                case 'A':
                case '4':
                    setKeyDown(4);
                    break;

                case 's':
                case 'S':
                case '5':
                    setKeyDown(5);
                    break;

                case 'd':
                case 'D':
                case '6':
                    setKeyDown(6);
                    break;

                case 'z':
                case 'Z':
                case '7':
                    setKeyDown(7);
                    break;
                
                case 'x':
                case 'X':
                case '8':
                    setKeyDown(8);
                    break;
                
                case 'c':
                case 'C':
                case '9':
                    setKeyDown(9);
                    break;
            }
        }        
        const handleKeyUp = () => {
            setKeyDown(0);
        }        

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }

    }, [])

    return keyDown;
}