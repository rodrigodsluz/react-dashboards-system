/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import { OutlineButton } from '@d1.cx/components';
import { Icon } from 'rsuite';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import { device } from '../../../theme/sizes';

export const ReportTableContainer = styled.div`
  width: 92vw;
  margin-left: 90px;
  margin-top: 125px;
  margin-right: 20px;
  overflow: hidden;

  @media ${device.laptop} {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 0px;
    position: absolute;
  }

  @media ${device.mobileL} {
    margin-top: -15px;
    margin-left: 12px;
    width: 92vw;
  }
`;

export const FilterContainer = styled.div`
  padding: 10px 0;
  background-color: white;
  border-radius: 14px;

  @media only screen and (max-width: 560px) {
    margin-top: 30px;
    margin-right: 25px;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  margin: 0 20px;

  @media only screen and (max-width: 1050px) {
    flex-direction: column;
  }
`;

export const FilterInputContainer = styled.div`
  width: 50%;

  @media only screen and (max-width: 1050px) {
    margin-bottom: 20px;
    width: 90%;
  }
`;

export const FilterButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;

  @media only screen and (max-width: 1050px) {
    width: 90%;
    margin-left: 0px;
    margin-bottom: 20px;
    position: relative;
  }
`;

export const PaginationContainer = styled.div`
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1050px) {
    margin-top: 60px;
    position: absolute;
    right: 220px;
  }

  @media ${device.tablet} {
    right: 160px;

    ${(props) => props.searching === 'true'
      && css`
            right: 280px;

      );
    `}
  }

  @media ${device.mobileL} {
    width: 320px;
    left: -15px;
    margin-top: 58px;
  }
`;

export const ExportButton = styled(Icon)`
  margin-right: 40px;

  @media only screen and (max-width: 1050px) {
    width: 10%;
    position: absolute;
    margin-top: 60px;
    right: 20px;
  }

  @media only screen and (max-width: 560px) {
    right: 50px;
  }
`;

export const ExportIcon = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

export const DateRangePickerContainer = styled.div`
  padding: 0px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1050px) {
    margin-top: 30px;
  }
`;

export const FilterItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  padding: 2px 0;
  margin: 8px 20px;
  display: flex;
  width: 20%;

  @media only screen and (max-width: 1150px) {
    width: 300px;
  }
`;

export const LargeFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  @media only screen and (max-width: 1050px) {
    margin-top: 20px;
  }
`;

export const LargeFilterItem = styled.div`
  padding: 2px 0;
  margin: 2px 20px;
  display: flex;
  width: 95%;

  @media only screen and (max-width: 1050px) {
    width: 85%;
  }
`;

export const DeleteBtn = styled.button`
  background: #fff;
  margin-top: 5px;
`;

export const ActiveFiltersContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 14px;
  padding: 0 15px;
  overflow-x: auto;
`;

export const FilterLabel = styled.span`
  white-space: nowrap;
  border: 1px solid #117eff;
  padding: 10px;
  border-radius: 6px;
  background: #117eff;
`;

export const ActiveFilterItems = styled.div`
  padding: 10px 5px;
  display: flex;
  align-items: center;
`;

export const ActiveFilterBoxes = styled.div`
  width: 100%;
`;

export const FilterBox = styled(Chip)`
  margin-left: 5px;
  margin-bottom: 2px;
`;

export const CleanFilterButton = styled(OutlineButton)`
  margin-right: 3px;

  &:hover {
    border: 1px solid #117eff;
  }

  @media ${device.laptop} {
    margin-left: 10px;
  }
`;

export const TableDataContainer = styled(TableContainer)`
  margin-top: 15px;
  background: white;
  border-radius: 14px;

  @media ${device.mobileL} {
    width: 340px;
  }
`;

export const TableWrapper = styled(Table)`
  min-width: 500px;
  height: 300px;
`;
export const TableHeadContainer = styled(TableHead)`
  && {
    white-space: nowrap;
    background: white;
  }
`;

export const StyledTableCell = styled(TableCell)`
  && {
    font-size: 14px;
    text-align: center;
    padding: 14px 8px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

export const StyledTableRow = styled(TableRow)`
  && {
    cursor: pointer;
  }
`;

export const TableLoadingContainer = styled.div`
  height: 480px;
  display: flex;
  align-items: center;
`;
