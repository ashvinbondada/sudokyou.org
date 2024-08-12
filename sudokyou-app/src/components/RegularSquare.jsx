import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useButtonHovered } from '../utils/hooks/useIsHovered';

export default function RegularSquare({ isEditable, squareValue}) {
  // const [cellValue, setCellValue] = useState(value);

  // const { buttonRef, isButtonHovered } = useButtonHovered();

  // useEffect(() => {
  //   if (isButtonHovered) {
  //     if (value === cellValue) {
  //       setCellValue(null);
  //     } else if (value > 0) {
  //       setCellValue(value);
  //     }
  //   }
  // }, [isButtonHovered, value, cellValue]);

  return (
    isEditable ? (
      <button className="editable-regular-square">{squareValue}</button>
    ) : (
      <div className="uneditable-regular-square">{squareValue}</div>
    )
  );
}

RegularSquare.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  inputValue: PropTypes.number,
};
