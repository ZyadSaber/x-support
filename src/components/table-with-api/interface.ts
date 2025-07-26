import { SharedTableProps } from "@/components/base-table";
import { RecordWithAnyValue } from "@/interfaces/global";
export interface TableWithApiProps extends SharedTableProps {
  tableParams?: RecordWithAnyValue;
  callOnFirstRender?: boolean;
  endPoint: string;
}
