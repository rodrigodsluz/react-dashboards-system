import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'output', // output node
    data: { label: 'Output novo' },
    position: { x: 350, y: 250 },
  },
  // animated edge
  {
    id: 'e1-2', source: '1', target: '2', animated: true,
  },
  {
    id: 'e2-3', source: '2', target: '3', animated: true,
  },
  {
    id: 'e1-4', source: '1', target: '4', animated: true,
  },
];

function Diagram() {
  return (
    <div style={{ height: '75vh' }}>
      <ReactFlow
        elements={elements}
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Diagram;
