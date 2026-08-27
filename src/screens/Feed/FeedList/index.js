import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {useGetFeed} from '../../../hooks/feed/queries';
import PostCard from '../../../components/PostCard';
import TextBase from '../../../components/Base/TextBase';
import {COLORS} from '../../../style/style';
import {styles} from './styles';

const FeedList = ({route, navigation}) => {
  const {trainerId} = route.params;
  const {data: posts, isLoading} = useGetFeed(trainerId);

  const handlePostPress = postId => {
    navigation.navigate('PostDetail', {postId});
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FontAwesomeIcon
                icon={faInbox}
                size={32}
                color={COLORS.dark.primary}
              />
            </View>
            <TextBase
              text="No hay publicaciones todavía"
              color="#B8B8B8"
              size={17}
              fontFamily="AirbnbCereal_W_Bk"
              style={{textAlign: 'center', marginBottom: 6}}
            />
            <TextBase
              text="Cuando tu trainer publique contenido, lo vas a ver acá"
              color="#7A7A7A"
              size={14}
              lines={2}
              fontFamily="AirbnbCereal_W_Bk"
              style={{textAlign: 'center'}}
            />
          </View>
        )}
        renderItem={({item}) => (
          <PostCard post={item} onPress={handlePostPress} fullWidth />
        )}
      />
    </View>
  );
};

export default FeedList;
