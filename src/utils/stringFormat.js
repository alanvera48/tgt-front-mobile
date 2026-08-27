export const formatText = text => {
  if (!text) return;

  return text
    .toLowerCase()
    .split('_')
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(' ');
};

export const formatArrayStringToCommaSeparated = stringArray => {
  if (!stringArray || typeof stringArray !== 'string') {
    return '';
  }

  try {
    const array = JSON.parse(stringArray);
    if (!Array.isArray(array)) {
      return '';
    }
    return array.join(', ');
  } catch (error) {
    return '';
  }
};
