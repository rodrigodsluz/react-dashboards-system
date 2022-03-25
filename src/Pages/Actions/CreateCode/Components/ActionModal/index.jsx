import React from 'react';
import PropTypes from 'prop-types';
import { JSONViewer } from 'react-json-editor-viewer';
import {
  Container, BackButton, Body, styles,
} from './styles';

const ActionModal = ({ value, handleClick }) => (
  <Container>
    <BackButton onClick={handleClick}>Voltar</BackButton>
    <Body>
      <JSONViewer
        theme="pop"
        data={value}
        collapsible
        styles={styles}
      />
    </Body>
  </Container>
);

ActionModal.propTypes = {
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ActionModal;
