/* eslint-disable no-plusplus */
import { useCallback, useState } from 'react';

const useCard = () => {
  const [username, setUsername] = useState('');

  const handleFormatName = useCallback(
    (name) => {
      const splitName = name?.split(' ');
      const MAX_SIZE_SHOW_LETTERS = splitName?.length > 1 ? 2 : 1;
      let finalName = '';
      if (splitName?.length > 0) {
        for (let index = 0; index < MAX_SIZE_SHOW_LETTERS; index++) {
          finalName += splitName[index].charAt(0);
        }
        setUsername(finalName);
      }
    },
    [username],
  );
  return { handleFormatName, username };
};

export default useCard;
