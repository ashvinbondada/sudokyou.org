// responsible for handling number clicks
// and sending them to the Board component, which
// will propagate this down
import { useEffect, useState } from "react";

export function useShiftClick() {
   const [shiftDown, setShiftDown] = useState(false);
    useEffect(() => {

        function handleShiftDown (this: Window, ev: WindowEventMap["keydown"]) {
            if (ev.key == 'Shift') {
                // e.preventDefault();
                setShiftDown(true);
            }
        }

        function handleShiftUp (this: Window, ev: WindowEventMap["keyup"]) {
            if (ev.key == 'Shift') {
                // e.preventDefault();
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
    const [keyDown, setKeyDown] = useState(0);

    useEffect(() => {
        function handleKeyDown (this: Window, ev: WindowEventMap["keydown"]) {
            // e.preventDefault();
            // console.log("pressed", e.key);
            switch (ev.key) {
                case 'q':
                case 'Q':
                case '1':
                case '!':
                    setKeyDown(1);
                    break;
                
                case 'w':
                case 'W':
                case '2':
                case '@':
                    setKeyDown(2);
                    break;
                
                case 'e':
                case 'E':
                case '3':
                case '#':
                    setKeyDown(3);
                    break;

                case 'a':
                case 'A':
                case '4':
                case '$':
                    setKeyDown(4);
                    break;

                case 's':
                case 'S':
                case '5':
                case '%':
                    setKeyDown(5);
                    break;

                case 'd':
                case 'D':
                case '6':
                case '^':
                    setKeyDown(6);
                    break;

                case 'z':
                case 'Z':
                case '7':
                case '&':
                    setKeyDown(7);
                    break;
                
                case 'x':
                case 'X':
                case '8':
                case '*':
                    setKeyDown(8);
                    break;
                
                case 'c':
                case 'C':
                case '9':
                case '(':
                    setKeyDown(9);
                    break;

                default:
                    break;
            }
        }        

        function handleKeyUp(this: Window, ev: WindowEventMap["keyup"]){
            // e.preventDefault();
            setKeyDown(0); // might be a performance hit
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