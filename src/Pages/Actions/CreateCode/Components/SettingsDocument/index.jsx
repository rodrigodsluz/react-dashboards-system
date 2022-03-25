/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
import AceEditor from 'react-ace';
import React, { useRef } from 'react';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Container } from './styles';
import useSettingsDocument from './useSettingsDocument';

const SettingsDocument = () => {
  const editor = useRef(null);
  const { code, handleChangeCode } = useSettingsDocument();
  function onChange(newValue) {
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

        return r.start.row === 0 || r.end.row === endRow;
      });

    if (notEditable) e.preventDefault();
  });

  return (
    <Container>
      <AceEditor
        ref={editor}
        placeholder="Escreva seu JSON aqui"
        mode="json"
        theme="monokai"
        name="editorAction"
        onChange={onChange}
        fontSize={14}
        showPrintMargin
        focus
        showGutter
        highlightActiveLine
        width="100%"
        height="700px"
        value={`${code}`}
        commands={[
          {
            name: 'run',
            bindKey: { win: 'Ctrl-enter', mac: 'Cmd-enter' },
            exec: () => {},
          },
        ]}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </Container>
  );
};

SettingsDocument.propTypes = {};

export default SettingsDocument;
