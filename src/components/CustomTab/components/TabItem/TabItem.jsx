/* eslint-disable react/prop-types */
import React from 'react';

import TabLine from '../TabLine/TabLine';
import { TabItemStyled, TabTextStyled } from './styled';

/**
 * @export
 * @component
 * @name TabItem
 *
 * @description
 * Responsável por conter as opcoes das tabs
 */
const TabItem = ({
  text,
  active = false,
  onChangeTabs,
}) => (
  <TabItemStyled
    data-testid={`btn${text}`}
  >
    <TabTextStyled active={active} onClick={onChangeTabs}>
      {text}
    </TabTextStyled>
    {active && <TabLine />}
  </TabItemStyled>
);

export default TabItem;
