/* eslint-disable react/prop-types */
import React from 'react';
import {
  Input,
  OutlineButton,
  Typography,
  LinkButton,
  Spacing,
} from '@d1.cx/components';
import { TrashAlt } from '@d1.cx/icons';
import {
  Center,
  Container,
  Wrapper,
  WrapperButtons,
  WrapperInputs,

} from './styles';
import useSelectedInput from './useSelectedInput';
import SuccessContent from '../SuccessContent';

function SelectedInputsExport({ data, product, toggle }) {
  const {
    handleAddNewInput,
    fields,
    handleRemoveInput,
    handleChangeInput,
    handleSubmit,
    loading,
    open,
    errorAPI,
  } = useSelectedInput();

  return (
    <Container>
      {open ? (
        <Center>
          <SuccessContent
            error={errorAPI}
            messageOne={errorAPI ? 'Ops! Alguma coisa deu errado! Por favor, verifique sua conexão.' : 'A exportação será enviada dentro de alguns minutos!'}
            messageTwo={errorAPI ? 'Tente novamente!' : 'Muito obrigado!'}
          />
          <LinkButton onClick={toggle}>Voltar</LinkButton>
        </Center>
      ) : (
        <>

          <Spacing vertical="10px" />

          <Wrapper>
            <Typography vertical="10px">
              Digite os campos que deseja que sejam enviados por email:
            </Typography>
            <OutlineButton onClick={handleAddNewInput}>Adicionar</OutlineButton>
          </Wrapper>

          <WrapperInputs>
            {fields?.map((_, index) => (
              <Wrapper>
                <Input
                  placeholder="Nome do campo"
                  onChange={(e) => handleChangeInput(e, index)}
                />
                <LinkButton onClick={() => handleRemoveInput(index)}>
                  {' '}
                  <TrashAlt width="30px" color="red" />
                </LinkButton>
              </Wrapper>
            ))}
          </WrapperInputs>
          <WrapperButtons>
            <OutlineButton onClick={toggle} loading={loading}>
              Cancelar
            </OutlineButton>
            <OutlineButton
              onClick={() => {
                handleSubmit(
                  {
                    ...data,
                  },
                  product,
                );
              }}
              loading={loading}
              disabled={loading || fields.length < 1}
            >
              Enviar
            </OutlineButton>
          </WrapperButtons>
        </>
      )}
    </Container>
  );
}

export default SelectedInputsExport;
