import {DIET_TIME_KEYS} from '../commons/diet-key';

export const colorByDiets = dietTime => {
  switch (dietTime) {
    case DIET_TIME_KEYS.DESAYUNO:
      return '#2ED12E';
    case DIET_TIME_KEYS.MEDIAMANIANA:
      return '#FFA935';
    case DIET_TIME_KEYS.ALMUERZO:
      return '#12E5B0';
    case DIET_TIME_KEYS.MERIENDA:
      return '#B575E7';
    case DIET_TIME_KEYS.MEDIATARDE:
      return '#FF5D5D';
    case DIET_TIME_KEYS.CENA:
      return '#3A86FF';
    case DIET_TIME_KEYS.COLACION:
      return '#FFB703';
    case DIET_TIME_KEYS.PREENTRENO:
      return '#FB5607';
    case DIET_TIME_KEYS.POSTENTRENO:
      return '#8338EC';
    default:
      return '#CCCCCC';
  }
};
