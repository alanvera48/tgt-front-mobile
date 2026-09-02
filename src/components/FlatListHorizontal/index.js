import React from 'react';
import {FlatList, View} from 'react-native';

export const FlatListHorizontal = ({
  data,
  renderEmptyComponent,
  renderHeaderComponent,
  renderFooterComponent,
  renderItem,
  style,
  separatorWidth = 20,
}) => {
  return (
    <FlatList
      horizontal
      contentInsetAdjustmentBehavior="never"
      snapToAlignment="center"
      decelerationRate="fast"
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      keyExtractor={item => item.id}
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={
        renderHeaderComponent && data?.length === 0
          ? renderHeaderComponent
          : () => <View style={{width: separatorWidth}} />
      }
      ListFooterComponent={
        renderFooterComponent
          ? renderFooterComponent
          : () => <View style={{width: separatorWidth}} />
      }
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{width: separatorWidth}} />}
      style={style}
    />
  );
};
