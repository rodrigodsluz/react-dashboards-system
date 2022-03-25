import React, { useState } from 'react';

import { Container, Wrapper } from './styles';
import Tabs from '../../components/CustomTab/Tabs';
import CreateEmail from './CreateEmail/CreateEmail';
import CreateSms from './CreateSms/CreateSms';
import CreateHsm from './CreateHsm/CreateHsm';
import CreateCode from './CreateCode/CreateCode';
import { tabsActions } from '../../components/CustomTab/configuration';

function Actions() {
  const [value, setValue] = useState(1);

  return (
    <Container>
      <Wrapper>
        <Tabs data={tabsActions} setTabActive={setValue} tabActive={value} />
        <>
          {value === 1 && <CreateEmail />}
          {value === 2 && <CreateSms />}
          {value === 3 && <CreateHsm />}
          {value === 4 && <CreateCode />}
        </>

      </Wrapper>
    </Container>
  );
}

export default Actions;
