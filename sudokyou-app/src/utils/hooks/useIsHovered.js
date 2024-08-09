import { useState, useEffect, useRef } from "react";

export function useButtonHovered() {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const buttonRef = useRef(null); 

    useEffect(() => {
        const handleMouseEnter = () => {
            setIsButtonHovered(true);
        }

        const handleMouseLeave = () => {
            setIsButtonHovered(false);
        }

        const buttonElement = buttonRef.current;

        if (buttonElement) {
            buttonElement.addEventListener('mouseenter', handleMouseEnter);
            buttonElement.addEventListener('mouseleave', handleMouseLeave);
        }
        
        return () => {
            buttonElement.removeEventListener('mouseenter', handleMouseEnter);
            buttonElement.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [buttonRef])

    return {buttonRef, isButtonHovered}
}



export function useDivHovered() {
    const [isDivHovered, setIsDivHovered] = useState(false);
    const divRef = useRef(null);
  
    useEffect(() => {
      const handleMouseEnter = () => {
        // setIsButtonHovered(false);
        setIsDivHovered(true);
      }
      const handleMouseLeave = () => setIsDivHovered(false);
  
      const divElement = divRef.current;
  
      if (divElement) {
        divElement.addEventListener('mouseenter', handleMouseEnter);
        divElement.addEventListener('mouseleave', handleMouseLeave);
      }
  
      // Cleanup event listeners
      return () => {
        if (divElement) {
          divElement.removeEventListener('mouseenter', handleMouseEnter);
          divElement.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
}, [])

    return {divRef, isDivHovered}
}