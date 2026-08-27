import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {
  faChevronDown,
  faChevronUp,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionHeader,
  AccordionContent,
  Accordion,
} from '@gluestack-ui/themed';
import VideoPlayer from 'react-native-video-player';

import TextBase from '../Base/TextBase';
import DropDownIcon from './components/DropDownIcon';
import {COLORS} from '../../style/style';
// import {MOCKED_EXERCISES_THUMBNAIL_LIST} from '../../constants/mocks';

export default function CollapsibleRutine({item, index}) {
  const [loading, setLoading] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoaded = () => {
    setLoading(false);
  };

  // const handleProgress = data => {
  //   setProgress(data.currentTime / data.seekableDuration);
  // };

  return (
    <Accordion
      key={index}
      width="100%"
      size="sm"
      type="multiple"
      variant="filled"
      isCollapsible={true}
      marginVertical={15}
      borderRadius={20}>
      <AccordionItem
        value={'a'}
        borderRadius={20}
        padding={5}
        backgroundColor={COLORS.dark.backgroundCard}>
        <AccordionHeader padding={0}>
          <AccordionTrigger
            height={'auto'}
            borderRadius={20}
            padding={0}
            flexDirection="row">
            {({isExpanded}) => {
              return (
                <>
                  {/* TODO: Deshabilitado hasta que se agregue el poder subir un thumbnail por ejercicio */}
                  {/* {item.thumbnailUrl && (
                    <Image
                      source={{
                        uri: item.thumbnailUrl,
                      }}
                      width={70}
                      height={76}
                      style={{
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}
                      alt="image-rutine"
                    />
                  )} */}
                  {/* <Image
                    source={MOCKED_EXERCISES_THUMBNAIL_LIST[index]}
                    resizeMode="cover"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      marginLeft: -8,
                    }}
                    alt="image-rutine"
                  /> */}
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 16,
                      width: '70%',
                    }}>
                    <TextBase
                      text={item.exerciseName}
                      color={'#ffff'}
                      lines={4}
                      fontFamily={'AirbnbCereal_W_Bd'}
                    />
                    <TextBase
                      text={`${item.set} series de ${item.repetition} repeticiones`}
                      color={COLORS.dark.textSecondary}
                      fontFamily={'AirbnbCereal_W_Bk'}
                    />
                    <TextBase
                      text={`${item.comments_by_trainer ?? ''}`}
                      color={COLORS.dark.textSecondary}
                      fontFamily={'AirbnbCereal_W_Bk'}
                    />
                  </View>
                  <View style={{marginLeft: 'auto'}}>
                    {isExpanded ? (
                      <DropDownIcon
                        icon={faChevronUp}
                        backgroundColor="transparent"
                        color={'#901d1dff'}
                      />
                    ) : (
                      <DropDownIcon
                        icon={faChevronDown}
                        backgroundColor="transparent"
                        color={'#ffff'}
                      />
                    )}
                  </View>
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent padding={0}>
          {item?.exerciseVideo?.url ? (
            <View style={{position: 'relative'}}>
              <VideoPlayer
                video={{
                  uri: item?.exerciseVideo?.url,
                }}
                style={{
                  height: 500,
                }}
                thumbnail={require('../../assets/image/pexels-cottonbro-4753890.jpg')}
                // onBuffer={handleBuffer}
                onLoadStart={handleLoadStart}
                onLoad={handleLoaded}
                // onBuffer={handleProgress}
              />
              {loading && (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color={COLORS.dark.primary} />
                </View>
              )}
              <View style={styles.progressBarContainer}>
                {/* <View
                  style={[styles.progressBar, {width: `${progress * 100}%`}]}
                /> */}
              </View>
            </View>
          ) : (
            <View style={styles.noVideoContainer}>
              <FontAwesomeIcon
                icon={faVideoSlash}
                size={48}
                color={COLORS.dark.textWhite}
              />
              <TextBase
                text="El entrenador no ha subido un video para este ejercicio"
                color={COLORS.dark.textWhite}
                fontFamily={'AirbnbCereal_W_Md'}
                style={{marginTop: 12, textAlign: 'center'}}
                lines={2}
                size={16}
              />
            </View>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  noVideoContainer: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundElevated,
    borderRadius: 15,
    marginTop: 10,
  },
});
