import {useState, useEffect} from 'react';

export const useManagePictures = (champProgress, dateState) => {
  const [images, setImages] = useState(undefined);

  useEffect(() => {
    if (champProgress) {
      setImages([
        {
          img: champProgress[dateState.monthIndex]?.frontPhotoUrl,
          name: 'Frente',
        },
        {
          img: champProgress[dateState.monthIndex]?.leftPhotoUrl,
          name: 'Lado izquierdo',
        },
        {
          img: champProgress[dateState.monthIndex]?.rightPhotoUrl,
          name: 'Lado derecho',
        },
        {
          img: champProgress[dateState.monthIndex]?.backPhotoUrl,
          name: 'Espalda',
        },
      ]);
    }
  }, [champProgress, dateState.monthIndex]);

  const selectImage = imageIndex => {
    let imageIndexToFocus = images[imageIndex];
    let previousImageFocus = images[0];
    setImages(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[imageIndex] = previousImageFocus;
      updatedItems[0] = imageIndexToFocus;
      return updatedItems;
    });
  };

  return {images, selectImage};
};
