/* eslint-disable no-multi-assign */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { dispatch } from '../../../../Config/store';

const ERROR_API = 'Ops! Alguma coisa de errada aconteceu!';
const SUCCESS_API = 'Pronto! Seus dados foram salvos!';

const useForms = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const documentJSON = useSelector((state) => state.Template.document);
  const uploadDataCSV = useSelector((state) => state.CSV.uploadDataCSV);
  const bodyCSV = useSelector((state) => state.CSV.bodyCSV);
  const [customColumns, setCustomColumns] = useState(uploadDataCSV);
  const [columnsData, setColumnsData] = useState([{ name: '', value: '' }]);
  const [errorAPI, setErrorAPI] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [statusId, setStatusId] = useState(0);
  const [headersInSystem, setHeadersInSystem] = useState([
    'nome',
    ' users',
    'cpf',
  ]);
  const [headersFormat, setHeadersFormat] = useState([]);

  const handleCloseNotification = useCallback(() => {
    setOpenNotification(!openNotification);
  }, [openNotification]);

  const handleChangeStatusId = useCallback(
    ({ target }) => {
      const id = parseInt(target.value, 10);
      setStatusId(id);
    },
    [statusId],
  );

  const handleChangeValue = ({ target }, index) => {
    const items = [...columnsData];
    items[index].name = target.value;
    setColumnsData(items);
  };

  const handleCreatingFieldsInArray = useCallback(() => {
    if (uploadDataCSV) {
      const array = [];

      uploadDataCSV.map((element) => {
        const isExist = headersFormat?.includes(element);

        array.push({ name: isExist ? element : 'Não verificado', value: '' });
      });
      setColumnsData(array);
    }
  }, [uploadDataCSV, columnsData, bodyCSV, headersInSystem]);

  const handleGetAllStatus = async () => {
    try {
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      setOpenNotification(true);
    }
  };

  // const handleGetSizeArray = ()=>{
  //   co
  // }

  function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map((key, index) => {
      const newKey = newKeys[index].name;

      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const format = bodyCSV.map((item) => {
        const renamedObj = renameKeys(item, columnsData);
        return renamedObj;
      });

      const body = bodyCSV?.map((element) => element);

      const payload = {
        status_id: statusId,
        product_id: currentProductById,
        cpf: uuidv4(),
        ...body,
        filled_columns: {},
        ...format,
      };

      await dispatch.Document.createDocumentByCSV({
        documents: [payload],
      });
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
    } finally {
      setOpenNotification(true);
      setLoading(false);
    }
  }, [
    columnsData,
    documentJSON,
    currentProductById,
    statusId,
    bodyCSV,
    uploadDataCSV,
  ]);

  useEffect(() => {
    handleCreatingFieldsInArray();
  }, [uploadDataCSV]);

  useEffect(() => {
    handleGetAllStatus();
  }, [currentProductById]);

  useEffect(() => {
    const words = headersInSystem?.map((v) => v.toLowerCase());
    setHeadersFormat(words);
  }, [headersInSystem]);

  useEffect(
    () => async () => {
      await dispatch.CSV.setCSVBodyAsync(false);
      await dispatch.CSV.setUploadDataCSVAsync(false);
      await dispatch.CSV.setInfosFileAsync(false);
      setHeadersFormat([]);
    },
    [],
  );

  return {
    customColumns,
    handleChangeValue,
    uploadDataCSV,
    openNotification,
    message,
    errorAPI,
    handleSubmit,
    handleChangeStatusId,
    statusId,
    loading,
    columnsData,
    handleCloseNotification,
    headersFormat,
  };
};

export default useForms;
