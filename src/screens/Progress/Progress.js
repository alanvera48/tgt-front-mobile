import React from 'react';
import {Tabs} from '@gluestack-ui/themed';
import InDashboard from '../../layouts/InDashboard';
import CalendarChamp from './CalendarChamp';
import ChampProgressSeenByChamp from '../ChampProgress/ChampProgressSeenByChamp';
import {CustomDrawerContainer} from '../../components/CustomDrawerContainer';
import {View} from 'react-native';
import {TabItem, TabList} from '../../components/TabComponents';
import {useAuthStore} from '../../store/authStore';

export default function Progress({route}) {
  const activeTab = route?.params?.activeTab;
  const userInfo = useAuthStore(state => state.userInfo);

  return (
    <CustomDrawerContainer>
      <InDashboard containerStyle={{paddingHorizontal: 0}}>
        {/* <InputSearch /> */}
        <Tabs value={activeTab ?? 'tab1'}>
          <TabList>
            <TabItem value="tab1" label="Calendario" />
            <TabItem value="tab2" label="Chequeos" />
          </TabList>

          <Tabs.TabPanels>
            <Tabs.TabPanel value="tab1">
              <CalendarChamp />
            </Tabs.TabPanel>
            <Tabs.TabPanel
              value="tab2"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ChampProgressSeenByChamp champ_id={userInfo?.id} />
              <View style={{marginBottom: 60}} />
            </Tabs.TabPanel>
          </Tabs.TabPanels>
        </Tabs>
      </InDashboard>
    </CustomDrawerContainer>
  );
}
