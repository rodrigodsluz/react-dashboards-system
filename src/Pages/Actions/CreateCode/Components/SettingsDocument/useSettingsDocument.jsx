/* eslint-disable camelcase */
import { useCallback, useState } from 'react';
import { dispatch } from '../../../../../Config/store';

const INITIAL = `{ 
    "":""
}`;

const useSettingsDocument = () => {
  const [code, setCode] = useState(INITIAL);

  const handleChangeCode = useCallback(
    (value) => {
      setCode(value);
      dispatch.Template.saveDocumentTrigger(value);
    },
    [code],
  );

  return {
    code,
    handleChangeCode,
  };
};

export default useSettingsDocument;
