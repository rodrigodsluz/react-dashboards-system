/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef } from 'react';
import {
  FlexContent,
  Input,
  LinkButton,
  PrimaryButton,
  Tooltip,
} from '@d1.cx/components';

import { TrashAlt, PlayCircle, PauseCircle } from '@d1.cx/icons';
import AceEditor from 'react-ace';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Container, Row, Select, Option, RunWrapper, Wrapper,
} from './styles';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/worker-javascript';
import Documents from './Components/Document';
import useCode from './useCode';
import SettingsDocument from './Components/SettingsDocument';
import ActionModal from './Components/ActionModal';
import SnackAlert from '../../../components/SnackAlert';
import Diagram from './Components/Diagram';

const CreateCode = () => {
  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );

  const editor = useRef(null);
  const {
    allTemplatesTriggers,
    handleChangeTemplateName,
    handleSelectedTemplate,
    selectedTemplateId,
    loading,
    getOnlyTypeInAllTrigger,
    templateName,
    code,
    handleSubmit,
    handleChangeCode,
    handleRemoveAction,
    showDocuments,
    handleOpenDocumentSettings,
    run,
    handleRunTrigger,
    disabledSave,
    actionBody,
    handleResetAction,
    handleUpdateDevelopmentCode,
    alertOpen,
    messageAlert,
    alertType,
    handleCloseAlert,
    handlePublishProductionCode,
    handleToggleDiagram,
    showDiagram,
  } = useCode();

  editor?.current?.editor.commands?.on('exec', (e) => {
    if (e.command.readOnly) return;

    const endRow = editor.current.editor.session?.getLength() - 1;

    const deletesLeft = e.command.name === 'backspace' || e.command.name === 'removewordleft';
    const deletesRight = e.command.name === 'del' || e.command.name === 'removewordright';

    const notEditable = editor.current.editor.selection
      ?.getAllRanges()
      .some((r) => {
        if (
          deletesLeft
          && r.start.column === 0
          && r.end.column === 0
          && r.start.row === 1
        ) {
          return true;
        }

        if (
          deletesRight
          && r.end.row === endRow - 1
          && r.start.column
            === editor.current.editor.session.getLine(r.start.row).length
        ) {
          return true;
        }

        return (
          r.start.row === 0
          || r.start.row === 1
          || r.end.row === endRow
          || r.end.row === endRow - 1
        );
      });

    if (notEditable) e.preventDefault();
  });

  function handleChange(newValue) {
    const {
      current: {
        editor: {
          $lastSel: { start: selectedLine },
        },
      },
    } = editor;

    if (selectedLine.row !== 0) {
      handleChangeCode(newValue);
    }
  }

  useEffect(() => {
    getOnlyTypeInAllTrigger('action');
  }, [allTemplates, document]);

  return (
    <Container>
      <SnackAlert
        open={alertOpen}
        handleClose={handleCloseAlert}
        severity={alertType}
        message={messageAlert}
      />
      <FlexContent spaceBetween>
        <Row>
          <Input
            placeholder="Digite o nome da sua função"
            value={templateName}
            onChange={handleChangeTemplateName}
          />

          <RunWrapper onClick={handleRunTrigger} disabled={run}>
            {run ? (
              <PauseCircle width="30px" color="white" />
            ) : (
              <PlayCircle width="30px" color="white" />
            )}
          </RunWrapper>

        </Row>
        <Select
          name="select-template"
          id="template"
          onChange={handleSelectedTemplate}
          value={selectedTemplateId}
        >
          <Option value="0">Selecionar um template</Option>

          {allTemplatesTriggers
            && allTemplatesTriggers?.map((template) => (
              <Option key={template.id} value={template.id.toString()}>
                {template.definition.name}
              </Option>
            ))}
        </Select>
        <Row>
          {selectedTemplateId !== '0' && (
            <>
              {' '}
              <Tooltip content="Remover template" top whiteSpace>
                <LinkButton onClick={handleRemoveAction}>
                  <TrashAlt color="red" width="25px" />
                </LinkButton>
                {' '}
              </Tooltip>
            </>
          )}

          <PrimaryButton
            onClick={parseInt(selectedTemplateId, 10) !== 0 ? handleUpdateDevelopmentCode : handleSubmit}
            disabled={loading || disabledSave}
            loading={loading}
          >
            {parseInt(selectedTemplateId, 10) !== 0
              ? 'Atualizar '
              : 'Salvar '}
          </PrimaryButton>
          {parseInt(selectedTemplateId, 10) !== 0 && (
            <PrimaryButton
              onClick={handlePublishProductionCode}
              disabled={loading}
              loading={loading}
            >
              Publicar
            </PrimaryButton>
          )}
        </Row>
      </FlexContent>
      {actionBody && <ActionModal value={actionBody} handleClick={handleResetAction} />}
      {showDiagram ? <Diagram /> : (
        <FlexContent>
          <Wrapper>
            <AceEditor
              ref={editor}
              placeholder="Escreva sua função aqui"
              mode="javascript"
              theme="monokai"
              name="editorAction"
              onChange={handleChange}
              fontSize={14}
              showPrintMargin
              focus
              showGutter
              highlightActiveLine
              width={showDocuments ? '90%' : '100%'}
              height="800px"
              value={`${code}`}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Wrapper>
          <Documents
            handleClick={handleOpenDocumentSettings}
            open={showDocuments}
          />
          {showDocuments && <SettingsDocument />}
        </FlexContent>
      )}

    </Container>
  );
};

export default CreateCode;
