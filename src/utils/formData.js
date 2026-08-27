import {Platform} from 'react-native';

export const buildImageFormData = ({fieldName, image, fileName}) => {
  const formData = new FormData();
  formData.append(fieldName, {
    uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
    type: image.mime || 'image/jpeg',
    name: fileName || image.filename || 'photo.jpg',
  });
  return formData;
};
