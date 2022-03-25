import React, { useState } from 'react';
import { tabsTriggers } from '../../components/CustomTab/configuration';
import Tabs from '../../components/CustomTab/Tabs';
import Form from './components/Form';
import Trigger from './components/Trigger';
import { Container, Wrapper } from './styles';

const TriggerCommunication = () => {
  const [value, setValue] = useState(1);
  return (
    <Container>
      <Wrapper>
        <Tabs data={tabsTriggers} setTabActive={setValue} tabActive={value} />
        <>
          {value === 1 && <Form />}
          {value === 2 && <Trigger />}
        </>
      </Wrapper>
    </Container>
  );
};

export default TriggerCommunication;
