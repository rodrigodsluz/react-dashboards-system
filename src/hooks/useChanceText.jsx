import { useCallback, useState } from 'react';

function useChangeText() {
  const [text, setText] = useState('');

  const handleChangeText = useCallback(
    (event) => {
      setText(event?.target?.value);
    },
    [text],
  );

  const handleSettInput = useCallback((value) => {
    setText(value);
  }, [text]);

  return [text, handleChangeText, handleSettInput];
}

export default useChangeText;
