const calculateCellStringWidthToPixelNumber = (
  totalWidth: number,
  cellWidth?: string | number
) => {
  if (!cellWidth) {
    return cellWidth as undefined;
  }

  const insuredNoSpacesCellWidth = cellWidth.toString().replace(/\s/g, "");

  const isGivenStringAlreadyNumber = !isNaN(+insuredNoSpacesCellWidth);

  if (isGivenStringAlreadyNumber) {
    return +insuredNoSpacesCellWidth as number;
  }

  const [actualCellWidth] = insuredNoSpacesCellWidth.split("%");

  return +((+actualCellWidth / 100) * totalWidth).toFixed(2) as number;
};

export default calculateCellStringWidthToPixelNumber;
