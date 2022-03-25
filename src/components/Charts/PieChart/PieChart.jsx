import React, { useCallback, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import { Spacing, Typography } from '@d1.cx/components';
import { Container, SelectItem } from '../../SwitchMenu/styles';
import colors from '../../../theme/colors';

const data = [
  { name: 'Dentro do SLA', value: 400 },
  { name: 'Fora do SLA', value: 420 },
  { name: 'Sem SLA', value: 1230 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const itemSwicth = [
  { id: '1', name: 'Andamento' },
  { id: '2', name: 'Finalizados' },
];
export default function PieGraph({ finished, running }) {
  const [status, setStatus] = useState('Andamento');

  const handleSelect = useCallback(
    (product) => {
      setStatus(product);
    },
    [status, finished, running],
  );

  return (
    <>
      <Container>
        {itemSwicth
          && itemSwicth.map((elem) => (
            <SelectItem onClick={() => handleSelect(elem.name)} key={elem.name} data-testid={`btn${elem.name}`}>
              <Typography
                color={
                  status === elem.name
                    ? colors.textPrimary
                    : colors.textSecondary
                }
                fontSize="15px"
                bold
              >
                {elem.name}
              </Typography>
            </SelectItem>
          ))}
      </Container>
      <Spacing vertical="10px" />
      <PieChart width={400} height={200}>
        <Pie
          data={status && status === 'Andamento' ? running : finished}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={90}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}
PieGraph.propTypes = {
  running: PropTypes.shape({}).isRequired,
  finished: PropTypes.shape({}).isRequired,
};
