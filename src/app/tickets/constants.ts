import getCustomDateRange from "@/lib/getCustomDateRange";

export const modalTitle = {
  N: "Add new ticket",
  U: "Edit ticket",
};

export const initialValues = {
  selectedRecord: {},
  type: "S",
  ticket_id: "",
  date: getCustomDateRange(),
  client_name: "",
  ticket_status: "O",
};

export const COLUMNS = [
  {
    label: "Ticket id",
    dataIndex: "ticket_id",
  },
  {
    label: "Ticket date",
    dataIndex: "ticket_date",
  },
  {
    label: "Ticket end date",
    dataIndex: "ticket_end_date",
  },
  {
    label: "Client name",
    dataIndex: "client_name",
  },
  {
    label: "Ticket name",
    dataIndex: "ticket_name",
  },
  {
    label: "Submitted by",
    dataIndex: "submitted_by_name",
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
