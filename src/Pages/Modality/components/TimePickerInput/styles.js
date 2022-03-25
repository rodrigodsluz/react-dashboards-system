/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { TimePicker } from 'antd';
import { device } from '../../../../theme/sizes';

export const StyledTimePicker = styled(TimePicker.RangePicker)`
  border-radius: 14px;
  @media ${device.laptop} {
  }
`;
