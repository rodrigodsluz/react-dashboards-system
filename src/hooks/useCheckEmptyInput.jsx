import { useCallback, useEffect, useState } from 'react';

function useCheckEmptyInput(text) {
  const [error, setError] = useState(false);

  const handleCheckValue = useCallback(() => {
    if (text?.length) {
      setError(false);
    } else {
      setError(true);
    }
  }, [text]);

  useEffect(() => {
    handleCheckValue();
  }, [text, error]);

  return error;
}

export default useCheckEmptyInput;
