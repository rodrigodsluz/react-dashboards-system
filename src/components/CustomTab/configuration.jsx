/* eslint-disable import/prefer-default-export */
import { v1 as uuidv1 } from 'uuid';

/**
 * @export
 * @type
 * @name tabs
 *
 * @description
 * Configuracões do componente tabs.
 */
export const tabs = [
  { text: 'Associar', index: 1, id: uuidv1() },
  { text: 'Remover', index: 2, id: uuidv1() },
];

export const tabsActions = [
  { text: 'Email', index: 1, id: uuidv1() },
  { text: 'Sms', index: 2, id: uuidv1() },
  { text: 'Hsm', index: 3, id: uuidv1() },
  { text: 'Action', index: 4, id: uuidv1() },
];

export const tabsDashboard = [
  { text: 'Geral', index: 1, id: uuidv1() },
  { text: 'Esteira', index: 2, id: uuidv1() },
  { text: 'Resumo', index: 3, id: uuidv1() },
  { text: 'Extras', index: 4, id: uuidv1() },
];

export const tabsTriggers = [
  { text: 'Caixa', index: 1, id: uuidv1() },
  { text: 'Disparador', index: 2, id: uuidv1() },
];
