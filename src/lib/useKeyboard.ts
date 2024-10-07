// import { useEffect, useState } from "react";

// export function useShiftClick() {
//    const [shiftDown, setShiftDown] = useState(false);
//     useEffect(() => {

//         function handleShiftDown (this: Window, ev: WindowEventMap["keydown"]) {
//             if (ev.key == 'Shift') {
//                 setShiftDown(true);
//             }
//         }

//         function handleShiftUp (this: Window, ev: WindowEventMap["keyup"]) {
//             if (ev.key == 'Shift') {
//                 setShiftDown(false);
//             }
//         }

//         window.addEventListener('keydown', handleShiftDown);
//         window.addEventListener('keyup', handleShiftUp);

//         return () => {
//             window.removeEventListener('keydown', handleShiftDown);
//             window.removeEventListener('keyup', handleShiftUp);
//         }
//     }, []);

//     return shiftDown
// }
