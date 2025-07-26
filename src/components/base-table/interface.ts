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

export interface SharedTableProps {
  onClickOpen?: () => void;
  AddButtonLabel?: string;
  columns: columnsRecord[];
  handleEdit?: (record?: RecordWithAnyValue) => void;
  handleDelete?: (record?: RecordWithAnyValue) => void;
  actionButtons?: actionButtonProp[];
  expandable?: boolean;
  renderExpanded?: (record: RecordWithAnyValue) => React.ReactNode;
  rowKey: string;
  isLoading?: boolean;
}

export interface BaseTableProps extends SharedTableProps {
  isLoading?: boolean;
  dataSource: RecordWithAnyValue[];
}
