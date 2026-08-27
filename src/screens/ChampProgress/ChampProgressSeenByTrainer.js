import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '../../style/style';
import TextBase from '../../components/Base/TextBase';
import {useGetChampProgressBeingTrainer} from '../../hooks/user/queries';
import {DropdownYear} from './DropdownYear';
import {DEVICE_HEIGHT} from '../../constants';
import {INITIAL_YEAR, MONTHS, YEARS_OPTIONS} from './Constants';
import {
  EmptyCard,
  NextArrow,
  PictureCard,
  PreviousArrow,
  TextCard,
} from './Components';
import {useManagePictures} from './useManagePictures';

export default function ChampProgressSeenByTrainer({champ_id}) {
  const [dateState, setDateState] = useState({
    monthIndex: 0,
    year: 2025,
  });
  const {
    data: champProgress,
    refetch: refetchChampProgress,
    isPending: isPendingChampProgress,
  } = useGetChampProgressBeingTrainer({
    champId: champ_id,
    year: dateState.year,
  });

  const {images, selectImage} = useManagePictures(champProgress, dateState);

  useEffect(() => {
    refetchChampProgress();
  }, [refetchChampProgress, dateState.year]);

  const handlePressPreviousArrow = () => {
    if (dateState.monthIndex === 0) {
      const newDateState = {
        monthIndex: 11, // Diciembre
        year: dateState.year - 1,
      };
      setDateState(newDateState);
    } else {
      setDateState(prevState => ({
        ...prevState,
        monthIndex: prevState.monthIndex - 1,
      }));
    }
  };

  const handlePressNextArrow = () => {
    if (dateState.monthIndex !== 11) {
      setDateState(prevState => ({
        ...prevState,
        monthIndex: prevState.monthIndex + 1,
      }));
    } else {
      setDateState(prevState => ({
        monthIndex: 0,
        year: prevState.year + 1,
      }));
    }
  };

  if (isPendingChampProgress && !images) {
    return (
      <View style={styles.containerView}>
        <View
          style={{
            height: DEVICE_HEIGHT - 260,
            justifyContent: 'center',
            width: '100%',
            zIndex: 2,
          }}>
          <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
        </View>
      </View>
    );
  }

  const renderContent = () => {
    if (champProgress === undefined) {
      return (
        <View
          style={{
            height: 590,
            paddingHorizontal: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextBase
            text={'El champ aún no tiene progresos disponibles.'}
            color={COLORS.dark.textWhite}
            style={{textAlign: 'center'}}
            lines={3}
            size={18}
            fontFamily={'AirbnbCereal_W_Bk'}
          />
        </View>
      );
    }

    return (
      <>
        {images?.[0]?.img ? (
          <PictureCard
            index={0}
            imageUri={images?.[0]?.img}
            isBig
            onPress={() => selectImage(0)}
          />
        ) : (
          <EmptyCard isBig />
        )}
        <TextCard text={images?.[0]?.name} isBig />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          style={styles.secondaryPicturesContainer}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            {images && images[1]?.img ? (
              <PictureCard
                index={1}
                imageUri={images[1]?.img}
                onPress={() => selectImage(1)}
              />
            ) : (
              <EmptyCard />
            )}
            <TextCard text={images?.[1]?.name} />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            {images && images[2]?.img ? (
              <PictureCard
                index={2}
                imageUri={images?.[2]?.img}
                onPress={() => selectImage(2)}
              />
            ) : (
              <EmptyCard />
            )}
            <TextCard text={images?.[2]?.name} />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            {images && images[3]?.img ? (
              <PictureCard
                index={3}
                imageUri={images?.[3]?.img}
                onPress={() => selectImage(3)}
              />
            ) : (
              <EmptyCard />
            )}
            <TextCard text={images?.[3]?.name} />
          </View>
        </ScrollView>
      </>
    );
  };

  return (
    <>
      <View style={styles.containerView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <PreviousArrow
              onPress={() => handlePressPreviousArrow()}
              style={{
                opacity:
                  dateState.year === INITIAL_YEAR && dateState.monthIndex === 0
                    ? 0.3
                    : 1,
              }}
              disabled={
                dateState.year === INITIAL_YEAR && dateState.monthIndex === 0
              }
            />
            <View style={{alignItems: 'center'}}>
              <TextBase
                text={MONTHS[dateState.monthIndex]}
                fontFamily={'AirbnbCereal_W_Bd'}
                size={24}
                color={COLORS.dark.primary}
                style={{marginBottom: 6}}
              />
              <View
                style={{
                  height: 40,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <DropdownYear
                  items={YEARS_OPTIONS}
                  onValueChange={value => {
                    setDateState(prevState => ({
                      ...prevState,
                      year: value ?? INITIAL_YEAR,
                      monthIndex: prevState.monthIndex,
                    }));
                  }}
                  value={dateState.year}
                />
              </View>
            </View>
            <NextArrow
              onPress={() => handlePressNextArrow()}
              style={{
                opacity:
                  dateState.year ===
                    YEARS_OPTIONS[YEARS_OPTIONS.length - 1].value &&
                  dateState.monthIndex === 11
                    ? 0.3
                    : 1,
              }}
              disabled={
                dateState.year ===
                  YEARS_OPTIONS[YEARS_OPTIONS.length - 1].value &&
                dateState.monthIndex === 11
              }
            />
          </View>
          {renderContent()}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingBottom: 20,
  },
  secondaryPicturesContainer: {
    marginVertical: 20,
    width: '100%',
    flex: 1,
  },
});
