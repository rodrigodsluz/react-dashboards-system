/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import ChartDaysOutSla from '../../components/Charts/ChartDaysOutSla';
import CardsProcessCount from '../../components/Cards/CardsProcessCount';
import ChartStatusCount from '../../components/Charts/ChartStatusCount';
import ChartSlaCountTime from '../../components/Charts/ChartSlaCountTime';
import ChartSlaCountModality from '../../components/Charts/ChartSlaCountModality';
import ChartCardSlaStatusCount from '../../components/Charts/ChartCardSlaStatusCount';

const TabOneContent = ({ product, date }) => (
  <>
    <CardsProcessCount />

    <ChartCardSlaStatusCount />

    <ChartSlaCountModality />

    <ChartSlaCountTime />

    <ChartStatusCount product={product} date={date} />

    <ChartDaysOutSla />
  </>
);

TabOneContent.propTypes = {
  date: PropTypes.array.isRequired,
  product: PropTypes.number.isRequired,
};

export default TabOneContent;
