import { useCallback, useState } from 'react';

function useToggleNotification() {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (value) => {
      setOpen(value);
    },
    [open],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return [open, handleChange, handleClose];
}

export default useToggleNotification;
