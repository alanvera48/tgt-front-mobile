import React from 'react';
import {Tabs} from '@gluestack-ui/themed';
import DiscoverDiets from './DiscoverDiets';
import DietsCustom from './DietsCustom';
import {CustomDrawerContainer} from '../../../components/CustomDrawerContainer/index';
import {TabItem, TabList} from '../../../components/TabComponents';
import {Assigned} from './Assigned';
import {COLORS} from '../../../style/style';

export const DietsTrainer = ({route}) => {
  const activeTab = route?.params?.activeTab;

  return (
    <CustomDrawerContainer>
      {/* <InputSearch /> */}
      <Tabs
        value={activeTab ?? 'tab1'}
        style={{backgroundColor: COLORS.dark.background}}>
        <TabList>
          <TabItem value="tab1" label="Descubrí" />
          <TabItem value="tab2" label="Dietas" />
          <TabItem value="tab4" label="Asignado" />
        </TabList>

        <Tabs.TabPanels>
          <Tabs.TabPanel value="tab1">
            <DiscoverDiets />
          </Tabs.TabPanel>
          <Tabs.TabPanel
            value="tab2"
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <DietsCustom />
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab4">
            <Assigned />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </CustomDrawerContainer>
  );
};
