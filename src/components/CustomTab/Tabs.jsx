/* eslint-disable react/prop-types */
import React from 'react';

import { TabsStyled } from './styled';
import useTabs from './useTabs';
import TabItem from './components/TabItem/TabItem';

/**
 * @export
 * @component
 * @name Tabs
 *
 * @description
 * Responsável por agrupar o conteudo
 */
const Tabs = ({ data, setTabActive, tabActive }) => {
  const { handleClickChangeTab } = useTabs();
  return (
    <TabsStyled>
      {data.map((item, index) => (
        <TabItem
          key={item.id}
          text={item.text}
          active={index + 1 === tabActive}
          onChangeTabs={() => {
            handleClickChangeTab(item.index);
            setTabActive(item.index);
          }}
        />
      ))}
    </TabsStyled>
  );
};
export default Tabs;
