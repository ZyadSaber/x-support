const getFileExtension = (filename: string): string => {
  // Handle hidden files (like .env) and files with multiple dots (like archive.tar.gz)
  const parts = filename.split(".");
  if (parts.length === 1 || (parts[0] === "" && parts.length === 2)) {
    return ""; // No extension or hidden file without extension
  }
  return parts.pop()?.toLowerCase() || "";
};

export default getFileExtension;
