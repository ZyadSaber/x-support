export const getStatusName = (status) => {
  if (status === "O") {
    return "Open";
  } else if (status === "C") {
    return "Closed";
  }
};
