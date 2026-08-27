import React from 'react';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../style/style';

const {dark: theme} = COLORS;

export default function InDashboard({
  children,
  onRefresh = undefined,
  isRefetching = undefined,
  containerStyle,
  style,
}) {
  return (
    <ScrollView
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            // IOS
            tintColor={theme.primary}
            // Android
            progressBackgroundColor={theme.backgroundLight}
            colors={[theme.primary]}
          />
        ) : undefined
      }
      contentContainerStyle={[
        {
          flexGrow: 1,
          backgroundColor: COLORS.dark.background,
          paddingHorizontal: 12,
        },
        containerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={false}
      style={[
        {
          paddingBottom: 12,
          backgroundColor: COLORS.dark.background,
          position: 'relative',
        },
        style,
      ]}>
      {children}
    </ScrollView>
  );
}
