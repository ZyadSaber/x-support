import { useCallback, useState } from "react";

const useOpenStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export default useOpenStatus;
