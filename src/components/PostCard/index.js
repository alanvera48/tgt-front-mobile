import React, {useState, useMemo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';
import {styles} from './styles';

const PLACEHOLDER_IMAGES = [
  require('../../assets/image/home.png'),
  require('../../assets/image/pexels-cottonbro-4753890.jpg'),
  require('../../assets/image/personal-trainer.jpg'),
];

const getRandomPlaceholder = () =>
  PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];

const PostCard = ({post, onPress, fullWidth = false}) => {
  const hasImage =
    post.imageUrl ||
    post.files?.some(f => f.entityType === 'post' && f.fileUrl);
  const imageUri = post.imageUrl || post.files?.find(f => f.fileUrl)?.fileUrl;
  const [imageError, setImageError] = useState(false);

  const placeholder = useMemo(() => getRandomPlaceholder(), []);

  const imageSource = hasImage && !imageError ? {uri: imageUri} : placeholder;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(post.id)}
      style={fullWidth ? styles.containerFullWidth : styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageError(true)}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.gradient}>
        {/* <View style={styles.trainerRow}>
          <Avatar size="xs">
            {post.trainer?.imageUrl ? (
              <AvatarImage source={{uri: post.trainer.imageUrl}} />
            ) : (
              <AvatarFallbackText>
                {post.trainer?.fullName || 'T'}
              </AvatarFallbackText>
            )}
          </Avatar>
        </View> */}

        <TextBase
          text={post.title}
          color={COLORS.dark.textWhite}
          size={18}
          lines={2}
          fontFamily="AirbnbCereal_W_Bd"
        />

        {post.description && (
          <TextBase
            text={post.description}
            color={COLORS.dark.textMuted}
            size={16}
            lines={1}
            fontFamily="AirbnbCereal_W_Bk"
            style={styles.description}
          />
        )}

        {post.likesCount > 0 && (
          <View style={styles.likesRow}>
            <FontAwesomeIcon
              icon={faHeart}
              size={10}
              color={COLORS.dark.primary}
              style={{marginRight: 4}}
            />
            <TextBase
              text={`${post.likesCount}`}
              color={COLORS.dark.textMuted}
              size={11}
              fontFamily="AirbnbCereal_W_Bk"
            />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PostCard;
