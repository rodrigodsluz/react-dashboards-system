import React, { useState } from 'react';
// import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';
// import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';
// import TabContext from '@material-ui/lab/TabContext';
// import colors from '../../../theme/colors';
import { Container, Wrapper } from './styles';

import AssociateStatus from './Tabs/AssociateStatus/AssociateStatus';
import DesassociateStatus from './Tabs/DesassociateStatus/DesassociateStatus';
import Tabs from '../../../components/CustomTab/Tabs';
import { tabs } from '../../../components/CustomTab/configuration';

function Actions() {
  const [value, setValue] = useState(1);

  return (
    <Container>
      <Wrapper>
        <Tabs data={tabs} setTabActive={setValue} tabActive={value} />
        <>
          {value === 1 && <AssociateStatus />}
          {value === 2 && <DesassociateStatus />}
        </>

      </Wrapper>
    </Container>
  );
}

export default Actions;
