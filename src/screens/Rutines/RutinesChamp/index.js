import React from 'react';
import {CustomDrawerContainer} from '../../../components/CustomDrawerContainer';
import {Tabs} from '@gluestack-ui/themed';
import {TabList, TabItem} from '../../../components/TabComponents';
import DiscoverUser from './DiscoverUser';
import {Finished} from './Finished';
import {COLORS} from '../../../style/style';

export default function RutinesChamp() {
  return (
    <CustomDrawerContainer>
      {/* <InputSearch /> */}
      <Tabs value="tab1" style={{backgroundColor: COLORS.dark.background}}>
        <TabList>
          <TabItem value="tab1" label="Mis entrenamientos" />
          <TabItem value="tab2" label="Finalizados" />
        </TabList>

        <Tabs.TabPanels>
          <Tabs.TabPanel value="tab1">
            <DiscoverUser />
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab2">
            <Finished />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </CustomDrawerContainer>
  );
}
