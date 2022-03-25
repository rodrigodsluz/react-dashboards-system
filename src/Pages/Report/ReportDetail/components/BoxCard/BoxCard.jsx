/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Typography, Input, Tooltip } from '@d1.cx/components';
import {
  Edit, Plus, Check, TrashAlt,
} from '@d1.cx/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { dispatch } from '../../../../../Config/store';
import {
  BoxContainer,
  LabelColor,
  AccordionContainer,
  AccordionContent,
  AccordionTitle,
  WrapperEditting,
  EdittingButton,
  ContainerInputs,
} from './styles';

/**
 * @function BoxCard
 * @description Componente que cria e separa os cards com informações e detalhes
 * dos processos
 */

const NOT_SHOW_ADD_FIELDS = 'Geral';
export default function BoxCard({ title, content, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [countFields, setCountFields] = useState(0);

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeValue = (event, index) => {
    const items = [...fieldsArray];
    items[index][1] = event.target.value;
    setFieldsArray(items);
  };

  const handleChangeLabel = (event, index) => {
    const items = [...fieldsArray];
    items[index][0] = event.target.value;
    setFieldsArray(items);
  };

  const handleAddNewField = () => {
    setCountFields(countFields + 1);
    const item = [`Novo campo ${countFields}`, ''];

    setFieldsArray([...fieldsArray, item]);
  };

  const handleRemoveField = (index) => {
    const item = [...fieldsArray];
    item.splice(index, 1);
    setFieldsArray(item);
  };

  const handleUpdateInfos = async () => {
    setIsEditing(false);
    try {
      const data = fieldsArray.reduce((array, item) => ({
        ...array,
        [item[0]]: item[1],
      }), {});
      const payload = title === 'Detalhes'
        ? {
          id,
          filled_columns: {
            ...data,
          },
        }
        : {
          id,
          filled_columns: {
            [title]: {
              ...data,
            },
          },
        };

      await dispatch.Document.updateDocumentByIdAsync(payload);
    } catch (error) {
      console.error('error', error);
    } finally {
      await dispatch.Document.loadDocumentByIdAsync(id);
    }
  };

  useEffect(() => {
    const entries = Object.entries(content);
    setFieldsArray(entries);
  }, [content]);

  return (
    <BoxContainer>
      <AccordionContainer defaultExpanded>
        <AccordionTitle
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-contdent"
          id="panel1a-header"
        >
          <Typography fontSize="18px" vertical="10px" bold>
            {title !== 'emptyKey' && title}
          </Typography>
        </AccordionTitle>

        {content && (
          <AccordionContent
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {title !== NOT_SHOW_ADD_FIELDS && (
              <>
                <WrapperEditting>
                  <Tooltip content={isEditing ? 'Salvar' : 'Editar'} left>
                    <EdittingButton
                      onClick={isEditing ? handleUpdateInfos : handleIsEditing}
                    >
                      {isEditing ? <Check width={20} /> : <Edit width={20} />}

                    </EdittingButton>
                  </Tooltip>
                </WrapperEditting>

                {/* {isEditing && (
                <WrapperEditting>
                  <Tooltip content="Adicionar novo campo" left whiteSpace>
                    <EdittingButton onClick={handleAddNewField}>
                      <Plus width={20} />
                    </EdittingButton>
                  </Tooltip>
                </WrapperEditting>
                )} */}

              </>
            )}

            {Object.entries(fieldsArray).map(([label, value], index) => (
              <ContainerInputs>
                <Typography fontSize="16px" vertical="4px">
                  <LabelColor>
                    {isEditing ? (
                      <Input
                        value={`${fieldsArray[index][0]}` || ''}
                        disabled={title === NOT_SHOW_ADD_FIELDS}
                        onChange={(event) => handleChangeLabel(event, index)}
                      />
                    ) : fieldsArray.length ? (
                      `${fieldsArray[index][0]}: `
                    ) : (
                      ''
                    )}
                  </LabelColor>

                  {isEditing ? (
                    <Input
                      value={`${fieldsArray[index][1]}` || ''}
                      onChange={(event) => handleChangeValue(event, index)}
                    />
                  ) : fieldsArray.length ? (
                    `${fieldsArray[index][1]}`
                  ) : (
                    ''
                  )}
                </Typography>
                {/* {isEditing && title !== NOT_SHOW_ADD_FIELDS && (
                  <Tooltip content="Remover campo" whiteSpace>
                    <EdittingButton onClick={() => handleRemoveField(index)}>
                      <TrashAlt width={25} color="red" />
                    </EdittingButton>
                  </Tooltip>
                )} */}
              </ContainerInputs>
            ))}
          </AccordionContent>
        )}
      </AccordionContainer>
    </BoxContainer>
  );
}
