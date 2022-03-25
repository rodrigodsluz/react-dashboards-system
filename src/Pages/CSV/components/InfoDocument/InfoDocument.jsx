import React from 'react';
import { Typography, FlexContent } from '@d1.cx/components';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

const InfoDocument = () => {
  const info = useSelector((state) => state.CSV.infosFile);
  return (
    <Card>
      <FlexContent>
        <Typography fontSize="16px" bold vertical="5px">
          Nome do arquivo:
        </Typography>
        <Typography fontSize="16px" vertical="5px" horizontal="5px">
          {info.name}
        </Typography>
      </FlexContent>

      <FlexContent>
        <Typography fontSize="16px" bold vertical="5px" horizontal="5px">
          Tamanho do arquivo:
        </Typography>
        <Typography fontSize="16px" vertical="5px">
          {(info.size / 1024).toFixed(2)}
          {' '}
          kb
        </Typography>
      </FlexContent>
    </Card>
  );
};

export default InfoDocument;
