import getCustomDateRange from "@/lib/getCustomDateRange";

export const modalTitle = {
  N: "Add new ticket",
  U: "Edit ticket",
};

export const initialValues = {
  selectedRecord: {},
  type: "S",
  ticket_id: "",
  date: getCustomDateRange(15),
  client_name: "",
  ticket_status: "",
  client_id: "",
};

export const COLUMNS = [
  {
    label: "Ticket id",
    dataIndex: "ticket_id",
    width: "12%",
  },
  {
    label: "Ticket date",
    dataIndex: "ticket_date",
    width: "11%",
  },
  {
    label: "Ticket end date",
    dataIndex: "ticket_end_date",
    width: "11%",
  },
  {
    label: "Client name",
    dataIndex: "client_name",
    width: "17%",
  },
  {
    label: "Ticket name",
    dataIndex: "ticket_name",
    width: "17%",
  },
  {
    label: "Submitted by",
    dataIndex: "submitted_by_name",
    width: "17%",
  },
];

export const statusOptions = [
  {
    label: "Open",
    key: "O",
  },
  {
    label: "Closed",
    key: "C",
  },
];

export const statusOptionsSearch = [
  ...statusOptions,
  { label: "All", key: "" },
];
