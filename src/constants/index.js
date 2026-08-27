import {Dimensions, Platform} from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const IS_ANDROID = Platform.OS === 'android';

export const MINIMUM_DAYS_TO_RATE_TRAINER = 2;
