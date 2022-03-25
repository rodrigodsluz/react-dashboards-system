import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';

export default function RadialGraph({ data }) {
  return (
    <div style={{ width: 300, height: 300, maxHeight: 400 }}>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          width={500}
          height={300}
          innerRadius={20}
          outerRadius={140}
          barSize={10}
          data={data || []}
        >
          <RadialBar minAngle={15} background clockWise dataKey="documents" />

          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
RadialGraph.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
