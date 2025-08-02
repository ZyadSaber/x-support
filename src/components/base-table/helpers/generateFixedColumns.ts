import { RecordWithAnyValue } from "@/interfaces/global";
import calculateCellStringWidthToPixelNumber from "./calculateCellStringWidthToPixelNumber";

interface GenerateFixedColumnsProps {
  containerWidthNumber: number;
  columnsFromProps: RecordWithAnyValue[];
  hasSelectionColumn?: boolean;
  hasExpandableColumn?: boolean;
  showExpandColumn?: boolean;
}

const generateFixedColumns = ({
  containerWidthNumber,
  columnsFromProps,
  showExpandColumn,
}: GenerateFixedColumnsProps) => {
  const columnsCount = columnsFromProps?.length ?? 0;

  const TABLE_EXPAND_COLUMN_WIDTH = 50;

  if (!columnsCount) {
    return [];
  }
  const eachCellWidthAmountFromExpandColumn = showExpandColumn
    ? columnsCount / TABLE_EXPAND_COLUMN_WIDTH
    : 0;

  const adjustedColumns = columnsFromProps.map(
    ({ width, title, label, ...column }) => {
      let fixedWidth = calculateCellStringWidthToPixelNumber(
        containerWidthNumber,
        width
      );

      fixedWidth = eachCellWidthAmountFromExpandColumn
        ? fixedWidth - eachCellWidthAmountFromExpandColumn
        : fixedWidth;

      return {
        ...column,
        title,
        width: fixedWidth,
        label,
      };
    }
  );

  return adjustedColumns;
};

export default generateFixedColumns;
