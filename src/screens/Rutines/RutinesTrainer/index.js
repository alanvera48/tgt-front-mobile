import React from 'react';
import {CustomDrawerContainer} from '../../../components/CustomDrawerContainer';
import {Tabs} from '@gluestack-ui/themed';
import {TabList, TabItem} from '../../../components/TabComponents';
import Discover from './Discover';
import {MyTrainings} from './MyTrainings';
import {Assigned} from './Assigned';
import {COLORS} from '../../../style/style';

export default function RutinesTrainer({route}) {
  const activeTab = route?.params?.activeTab;

  return (
    <CustomDrawerContainer>
      {/* <InputSearch /> */}
      <Tabs
        value={activeTab ?? 'tab1'}
        style={{backgroundColor: COLORS.dark.background}}>
        <TabList>
          <TabItem value="tab1" label="Descubrí" />
          <TabItem value="tab2" label="Mis entrenamientos" />
          <TabItem value="tab3" label="Asignados" />
        </TabList>

        <Tabs.TabPanels>
          <Tabs.TabPanel value="tab1">
            <Discover />
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab2">
            <MyTrainings />
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab3">
            <Assigned />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </CustomDrawerContainer>
  );
}
