import React from 'react';
import {Tabs} from '@gluestack-ui/themed';
import {CustomDrawerContainer} from '../../../components/CustomDrawerContainer/index';
import {TabItem, TabList} from '../../../components/TabComponents';
import DiscoverDiets from './DiscoverDiets';
import {Foods} from './Foods';
import {COLORS} from '../../../style/style';

export const DietsChamp = ({route}) => {
  const activeTab = route?.params?.activeTab;

  return (
    <CustomDrawerContainer>
      {/* <InputSearch /> */}
      <Tabs
        value={activeTab ?? 'tab1'}
        style={{backgroundColor: COLORS.dark.background}}>
        <TabList>
          <TabItem value="tab1" label="Descubrí" />
          <TabItem value="tab2" label="Alimentos" />
        </TabList>

        <Tabs.TabPanels>
          <Tabs.TabPanel value="tab1">
            <DiscoverDiets />
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab2">
            <Foods />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </CustomDrawerContainer>
  );
};
