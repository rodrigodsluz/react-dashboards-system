import React from 'react';
import { Typography } from '@d1.cx/components';
import { useSelector } from 'react-redux';
import Forms from './components/Forms/Forms';
import Upload from './components/Upload/Upload';
import InfoDocument from './components/InfoDocument/InfoDocument';
import {
  Container,
  Wrapper,
  Column,
  ContainerAnimation,
  ContainerText,
} from './styles';
import LottieNotification from '../../components/LottieNotification/LottieNotification';

const CSV = () => {
  const uploadedFile = useSelector((state) => state.CSV.uploadDataCSV);
  return (
    <Container>
      <Wrapper>
        <Column>
          <Upload uploaded={uploadedFile} />
          {uploadedFile && (
            <div>
              <InfoDocument />
              <ContainerAnimation>
                <LottieNotification
                  animation="alert"
                  hiddenBg
                  description=""
                  width="100px"
                />
              </ContainerAnimation>
              <ContainerText>
                <Typography>
                  Caso deseje enviar um JSON, preencha os valores no editor ao lado.
                </Typography>
              </ContainerText>
            </div>
          )}
        </Column>

        {uploadedFile && <Forms />}
      </Wrapper>
    </Container>
  );
};

export default CSV;
