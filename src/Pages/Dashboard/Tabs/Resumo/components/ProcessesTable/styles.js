/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import TablePagination from '@material-ui/core/TablePagination';
import { device } from '../../../../../../theme/sizes';

export const ToolbarContainer = styled(Toolbar)`
  padding: 0;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.span`
  margin-left: 13px;
`;

export const Pagination = styled(TablePagination)`
  margin-left: auto;
`;

export const TableLoadingContainer = styled.div`
  text-align: center;
  padding: 10px;
  max-height: 280px;
  overflow: hidden;
`;
