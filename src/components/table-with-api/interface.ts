import { RecordWithAnyValue } from "@/interfaces/global";

export interface columnsRecord {
  width?: string;
  label: string;
  dataIndex: string;
}

export interface actionButtonProp {
  title: string;
  type?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (record: RecordWithAnyValue) => void;
}

export interface TableWithApiProps {
  onClickOpen?: () => void;
  AddButtonLabel?: string;
  columns: columnsRecord[];
  tableParams?: RecordWithAnyValue;
  callOnFirstRender?: boolean;
  endPoint: string;
  handleEdit?: (record?: RecordWithAnyValue) => void;
  handleDelete?: (record?: RecordWithAnyValue) => void;
  actionButtons?: actionButtonProp[];
}
