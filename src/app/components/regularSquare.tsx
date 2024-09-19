type Props = {
  isEditable: boolean,
  squareValue: number
}

export default function RegularSquare({ isEditable, squareValue}: Props) {
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
    <div className="h-full w-full flex place-content-center items-center">
      {(squareValue > 0) ? squareValue : ''}
    </div>
  );
}
