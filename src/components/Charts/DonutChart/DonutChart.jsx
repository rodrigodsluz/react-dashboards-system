/* eslint-disable react/no-array-index-key */
import React from 'react';
import { FlexContent } from '@d1.cx/components';

import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import LegendItem from '../../LegendItem/LegendItem';
import { LegendGrid } from '../../../Pages/Dashboard/Tabs/Geral/styles';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#7262C9',
  '#3c5972',
  '#FFD791',
  '#5E4AE3',
  '#F26CA7',
  '#5E4AE3',
  '#52FFB8',
  '#283044',
  '#FB3640',
  '#0A2463',
  '#247BA0',
  '#F9DC5C',
];

export default function DonutChart({ data }) {
  return (
    <>
      {data ? (
        <FlexContent direction="column">
          <PieChart width={300} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="Quantidade"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <LegendGrid>
            {data?.map((legend, color) => (
              <LegendItem
                color={COLORS[color % COLORS.length]}
                title={legend.name}
                key={legend.name}
              />
            ))}
          </LegendGrid>
          {' '}
        </FlexContent>
      ) : (
        <></>
      )}
    </>
  );
}
DonutChart.propTypes = {
  data: PropTypes.shape([]).isRequired,
};
