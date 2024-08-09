import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useButtonHovered } from '../utils/hooks/useIsHovered';

export default function RegularSquare({ value, isEditable }) {
  const [cellValue, setCellValue] = useState(value);

  const { buttonRef, isButtonHovered } = useButtonHovered();

  useEffect(() => {
    if (isButtonHovered) {
      if (value === cellValue) {
        setCellValue(null);
      } else if (value > 0) {
        setCellValue(value);
      }
    }
  }, [isButtonHovered, value, cellValue]);

  return (
    isEditable ? (
      <button
        className="regular-square"
        ref={buttonRef}
        onClick={() => {
          console.log("clicked");
          if (value === cellValue) {
            setCellValue(null);
          } else if (value > 0) {
            setCellValue(value);
          }
        }}
      >
        {cellValue}
      </button>
    ) : (
      <div className="regular-square">
        {cellValue}
      </div>
    )
  );
}

RegularSquare.propTypes = {
  value: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
};
