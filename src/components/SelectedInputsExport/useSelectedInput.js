/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../Config/store';

const useSelectedInput = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const sendDocument = useSelector((state) => state.Document.downloadDocs);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);

  const [fields, setFields] = useState(['']);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleAddNewInput = useCallback(() => {
    setFields([...fields, '']);
  }, [fields]);

  const handleRemoveInput = useCallback(
    (index) => {
      const item = [...fields];
      item.splice(index, 1);
      setFields(item);
    },
    [fields],
  );
  const handleChangeInput = useCallback(
    ({ target }, index) => {
      const item = [...fields];
      item[index] = target.value;
      setFields(item);
    },
    [fields],
  );

  const handleSubmit = useCallback(
    async (filters) => {
      setLoading(true);
      const count = Object.entries(filters).length;
      let data = {};
      if (count !== 0) {
        delete filters.limit;
        delete filters.page;
        filters.products = [currentProductById];
        delete filters.product;
        delete filters.categories;
        data = filters;
      } else {
        data.products = [currentProductById];
      }

      const filterFields = fields.filter((elem) => elem.length);
      data.filled_column_as_column = filterFields;
      data.log_action_blacklist = ['STEP_UPDATED'];

      try {
        await dispatch.Document.downloadDocumentsAsync(data);
      } catch (error) {
        setErrorAPI(true);
      }

      setOpen(true);
      setFields([]);
      setLoading(false);
    },
    [fields, currentProductById, loading, sendDocument],
  );

  return {
    handleAddNewInput,
    handleRemoveInput,
    handleChangeInput,
    handleSubmit,
    fields,
    loading,
    handleClose,
    open,
    errorAPI,
  };
};

export default useSelectedInput;
