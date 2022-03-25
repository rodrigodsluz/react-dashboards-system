/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import {
  Input,
  Typography,
  Spacing,
  Select,
  PrimaryButton,
  FlexContent,
} from '@d1.cx/components';

import { useSelector } from 'react-redux';
import {
  Container, Wrapper, Row, WrapperRow, WrapperCards,
} from './styles';
import useForms from './useForms';
import SnackAlert from '../../../../components/SnackAlert';

const Forms = () => {
  const {
    handleChangeValue,
    columnsData,
    handleSubmit,
    handleChangeStatusId,
    statusId,
    loading,
    openNotification,
    errorAPI,
    handleCloseNotification,
    message,
  } = useForms();
  const statusState = useSelector((state) => state.Status.allState);
  const bodyCSV = useSelector((state) => state.CSV.bodyCSV);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (bodyCSV) {
      const keys = Object?.keys(bodyCSV[0]);
      setData(keys);
    }
  }, [bodyCSV]);

  return (
    <Container>
      <SnackAlert
        open={openNotification}
        handleClose={handleCloseNotification}
        severity={errorAPI ? 'error' : 'success'}
        message={message}
      />
      <Wrapper>
        <FlexContent align="center" spaceAround>
          <WrapperRow>
            <Typography bold fontSize="16px" vertical="10px">
              Associar ao status
            </Typography>
            <Select
              name="select-template"
              id="template"
              onChange={handleChangeStatusId}
            >
              <option value="0">Selecionar um template</option>

              {statusState
                && statusState?.map((item) => (
                  <option key={item.id} value={item.id.toString()}>
                    {item.status}
                  </option>
                ))}
            </Select>
          </WrapperRow>
          <WrapperRow>
            <Typography bold fontSize="16px" vertical="10px">
              Associar modalidade
            </Typography>
            <Select
              name="select-template"
              id="template"
              onChange={handleChangeStatusId}
            >
              <option value="0">Selecionar um template</option>

              {statusState
                && statusState?.map((item) => (
                  <option key={item.id} value={item.id.toString()}>
                    {item.status}
                  </option>
                ))}
            </Select>
          </WrapperRow>
          <WrapperRow>
            <PrimaryButton
              onClick={handleSubmit}
              disabled={statusId === 0 || loading}
              loading={loading}
            >
              Finalizar
            </PrimaryButton>
          </WrapperRow>
        </FlexContent>

        <Typography bold fontSize="16px" vertical="10px">
          Colunas CSV
        </Typography>
        <WrapperCards>
          {columnsData?.length > 0
            && columnsData?.map((element, index) => (
              <div key={index}>
                <Row>
                  <Input
                    type="text"
                    value={element?.name}
                    onChange={(event) => handleChangeValue(event, index)}
                  />
                  {bodyCSV.length > 0 && (
                    <Input
                      value={bodyCSV[0][data[index]] || ''}
                      disabled
                      type="text"
                    />
                  )}

                  <Spacing horizontal="5px" />
                </Row>
              </div>
            ))}
        </WrapperCards>
      </Wrapper>
    </Container>
  );
};

export default Forms;
