/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  height: 700px;
  background-color: #fff;
  z-index: 200;
  position: absolute;
  display: flex;
  align-self: center;
  border-radius: 8px;
  top: 230px;
  flex-direction: column;
  padding: 20px;
`;

export const Body = styled.div`
  background-color: #191621;
  height: 90%;
  padding: 20px;
  border-radius: 9px;
  color: #fff;
  overflow-y: scroll;
`;

export const BackButton = styled.button`
  background-color: #fff;
  width: 20px;
  padding: 10px;
  font-weight: bold;
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
    color: '#CEAD48',
  },
  label: {
    color: '#847DA7',
    marginTop: 3,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: 'flex',
  },
  withChildrenLabel: {
    color: '#847DA7',
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
    color: 'red',
    marginLeft: 15,
    fontSize: 12,
  },
  saveButton: {
    cursor: 'pointer',
    color: '#E289BF',
    marginLeft: 15,
    fontSize: 12,
  },
  builtin: {
    color: '#E289BF',
    fontSize: 12,
  },
  text: {
    color: '#CEAD48',
    fontSize: 12,
  },
  number: {
    color: 'purple',
    fontSize: 12,
  },
  property: {
    color: '#847DA7',
    fontSize: 12,
  },
  collapseIcon: {
    cursor: 'pointer',
    fontSize: 10,
    color: 'white',
  },
};
