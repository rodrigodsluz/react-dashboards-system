import { useState, useCallback } from 'react';

/**
 * @export
 * @function
 * @name useTabs
 *
 * @description
 * Responsável por conter todos os estado e eventos.
 */
const useTabs = () => {
  const [indexActive, setIndexActive] = useState(1);

  /**
   * @function
   * @name handleClickChangeTab
   *
   * @description
   * Responsável pelo evento de mudar a tab selecionada.
   */
  const handleClickChangeTab = useCallback((index) => {
    setIndexActive(index);
  }, []);

  return {
    indexActive,
    handleClickChangeTab,
  };
};

export default useTabs;
