/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 860px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 30px;
  background-color:#272822 ;
`;

export const Wrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

export const Click = styled.button`
  background-color: transparent;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const styles = {
  dualView: {
    display: 'flex',
  },
  jsonViewer: {
    borderLeft: '1px dashed white',
    lineHeight: 1.25,
    width: '50%',
    margin: 10,
  },
  jsonEditor: {
    width: '50%',
    fontSize: 12,
    fontFamily: 'Lucida Console, monospace',
    lineHeight: 1.25,
  },
  root: {
    fontSize: 12,
    fontFamily: 'Lucida Console, monospace',
    lineHeight: 1.25,
    color: '#fff',
  },
  label: {
    color: 'DeepPink',
    marginTop: 3,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: 'flex',
  },
  withChildrenLabel: {
    color: 'DeepPink',
  },
  select: {
    borderRadius: 3,
    borderColor: 'grey',
    backgroundColor: 'DimGray',
    color: 'khaki',
  },
  input: {
    borderRadius: 3,
    border: '1px solid #272822',
    padding: 2,
    fontFamily: 'Lucida Console, monospace',
    fontSize: 12,
    backgroundColor: 'gray',
    color: 'khaki',
    width: '200%',
  },
  addButton: {
    cursor: 'pointer',
    color: 'LightGreen',
    marginLeft: 15,
    fontSize: 12,
  },
  removeButton: {
    cursor: 'pointer',
    color: 'magenta',
    marginLeft: 15,
    fontSize: 12,
  },
  saveButton: {
    cursor: 'pointer',
    color: 'green',
    marginLeft: 15,
    fontSize: 12,
  },
  builtin: {
    color: 'green',
    fontSize: 12,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  number: {
    color: 'purple',
    fontSize: 12,
  },
  property: {
    color: 'DeepPink',
    fontSize: 12,
  },
  collapseIcon: {
    cursor: 'pointer',
    fontSize: 10,
    color: 'teal',
  },
};
