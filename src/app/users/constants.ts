export const initialValues = {
  selectedRecord: {},
  user_role: "SA",
  name: "",
  user_name: "",
};

export const COLUMNS = [
  {
    label: "ID",
    dataIndex: "id",
    width: "5%",
  },
  {
    label: "Name",
    dataIndex: "user_description",
    width: "15%",
  },
  {
    label: "User name",
    dataIndex: "user_name",
    width: "13%",
  },
  {
    label: "Last login time",
    dataIndex: "last_login_time",
    width: "10%",
  },
  {
    label: "User disabled",
    dataIndex: "user_disabled",
    width: "10%",
  },
  {
    label: "User role",
    dataIndex: "user_role_name",
    width: "15%",
  },
  {
    label: "Created at",
    dataIndex: "created_at",
    width: "10%",
  },
  {
    label: "Updated at",
    dataIndex: "updated_at",
    width: "10%",
  },
];

export const statusOptions = [
  {
    label: "Super admin",
    key: "SA",
  },
  {
    label: "Admin",
    key: "A",
  },
  {
    label: "Support",
    key: "S",
  },
  {
    label: "Developer",
    key: "D",
  },
];
