// import Game from "./components/game/game";

// export default function Home() {
//   return (
//       <div className="w-[80%] max-w-[700px] min-w-[400px] place-self-center z-100 shadow-2xl">
//         <Game />
//       </div>
//   );
// }
import Game from "./components/game/game";

export default function Home() {
  // const [shadow, setShadow] = useState("0px 0px 20px rgba(0, 0, 0, 0.5)");

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
    
  //   // Mouse position relative to the center of the component
  //   const x = e.clientX - offsetLeft - offsetWidth / 2;
  //   const y = e.clientY - offsetTop - offsetHeight / 2;

  //   // Invert the shadow to be on the opposite side of the mouse position
  //   const shadowX = -(x / offsetWidth) * 15; // Negative sign to invert
  //   const shadowY = -(y / offsetHeight) * 15;

  //   // Set the new shadow
  //   setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.5)`);
  // };

  return (
    <div 
      className="w-[60%] max-w-[700px] min-w-[400px] place-self-center z-100"
      // onMouseMove={handleMouseMove}
      // style={{ boxShadow: shadow }}
    >
      <Game />
    </div>
  );
}
