import React from 'react';
import {Tabs} from '@gluestack-ui/themed';
import InDashboard from '../../layouts/InDashboard';
import ChampsList from '../../components/ChampsList/ChampsList';
import {useGetMyChamps} from '../../hooks/user/queries';
import {CustomDrawerContainer} from '../../components/CustomDrawerContainer';
import {TabItem, TabList} from '../../components/TabComponents';

export default function MyChamps() {
  const {
    data: champs,
    refetch: refetchChamps,
    isRefetching: isRefetchingChamps,
  } = useGetMyChamps();

  return (
    <CustomDrawerContainer>
      <InDashboard
        isRefetching={isRefetchingChamps}
        onRefresh={() => refetchChamps()}>
        {/* <InputSearch /> */}
        <Tabs value="tab1" style={{marginTop: 10}}>
          <TabList>
            <TabItem value="tab1" label="Todos" />
            <TabItem value="tab2" label="Últimos" />
            <TabItem value="tab3" label="Sin aceptar" />
          </TabList>

          <Tabs.TabPanels>
            <Tabs.TabPanel value="tab1">
              <ChampsList champs={champs} filter={undefined} />
            </Tabs.TabPanel>
            <Tabs.TabPanel
              value="tab2"
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <ChampsList champs={champs} filter={'latest'} />
            </Tabs.TabPanel>
            <Tabs.TabPanel value="tab3">
              <ChampsList champs={champs} filter={'sin aceptar'} />
            </Tabs.TabPanel>
          </Tabs.TabPanels>
        </Tabs>
      </InDashboard>
    </CustomDrawerContainer>
  );
}
