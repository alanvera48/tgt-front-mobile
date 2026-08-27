import React, {useState, useMemo} from 'react';
import {View, ScrollView, Image, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {useGetPostById} from '../../../hooks/feed/queries';
import TextBase from '../../../components/Base/TextBase';
import {COLORS} from '../../../style/style';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {styles} from './styles';

const PLACEHOLDER_IMAGES = [
  require('../../../assets/image/home.png'),
  require('../../../assets/image/pexels-cottonbro-4753890.jpg'),
  require('../../../assets/image/personal-trainer.jpg'),
];

const getRandomPlaceholder = () =>
  PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];

const PostDetail = ({route}) => {
  const {postId} = route.params;
  const {data: post, isLoading} = useGetPostById(postId);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const placeholder = useMemo(() => getRandomPlaceholder(), []);

  if (isLoading || !post) {
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

  const imageUri =
    post.imageUrl ||
    post.files?.find(
      f => f.fileUrl && !f.fileUrl.match(/\.(mp4|mov|avi|webm)$/i),
    )?.fileUrl;
  const hasValidImage = imageUri && imageUri.startsWith('http');

  const hasVideo =
    post.videoUrl ||
    post.files?.some(f => f.fileUrl?.match(/\.(mp4|mov|avi|webm)$/i));
  const videoUri =
    post.videoUrl ||
    post.files?.find(f => f.fileUrl?.match(/\.(mp4|mov|avi|webm)$/i))?.fileUrl;

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), "d 'de' MMMM, yyyy", {locale: es})
    : '';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mediaContainer}>
          <Image
            source={
              hasValidImage && !imageError ? {uri: imageUri} : placeholder
            }
            style={styles.media}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.trainerRow}>
            <Avatar size="sm" style={{marginRight: 8}}>
              {post.trainer?.imageUrl ? (
                <AvatarImage source={{uri: post.trainer.imageUrl}} />
              ) : (
                <AvatarFallbackText>
                  {post.trainer?.fullName || 'T'}
                </AvatarFallbackText>
              )}
            </Avatar>
            <View style={styles.trainerInfo}>
              <TextBase
                text={post.trainer?.fullName}
                color={COLORS.dark.textWhite}
                size={14}
                fontFamily="AirbnbCereal_W_Bd"
              />
              <TextBase
                text={formattedDate}
                color={COLORS.dark.textMuted}
                size={12}
                fontFamily="AirbnbCereal_W_Bk"
              />
            </View>
          </View>

          <TextBase
            text={post.title}
            color={COLORS.dark.textWhite}
            size={22}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 12}}
          />

          <TextBase
            text={post.description}
            color={COLORS.dark.textSecondary}
            size={15}
            fontFamily="AirbnbCereal_W_Bk"
          />

          {hasVideo &&
            (videoError ? (
              <View style={styles.videoErrorContainer}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  size={24}
                  color={COLORS.dark.textMuted}
                />
                <TextBase
                  text="No se pudo cargar el video"
                  color={COLORS.dark.textMuted}
                  size={18}
                  fontFamily="AirbnbCereal_W_Bk"
                  style={{marginTop: 8}}
                />
              </View>
            ) : (
              <View style={styles.videoContainer}>
                <Video
                  source={{uri: videoUri}}
                  style={styles.video}
                  controls
                  resizeMode="contain"
                  paused
                  onError={() => setVideoError(true)}
                />
              </View>
            ))}

          {post.likesCount > 0 && (
            <View style={styles.likesRow}>
              <FontAwesomeIcon
                icon={faHeart}
                size={14}
                color={COLORS.dark.primary}
                style={{marginRight: 6}}
              />
              <TextBase
                text={`${post.likesCount} ${
                  post.likesCount === 1 ? 'like' : 'likes'
                }`}
                color={COLORS.dark.textMuted}
                size={13}
                fontFamily="AirbnbCereal_W_Bk"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetail;
