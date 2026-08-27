const DEFAULT_DIET_IMAGE =
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800';

/**
 * Devuelve la imagen a usar para una dieta: la propia si tiene, sino una
 * imagen por defecto de Pexels.
 * @param {{imageUrl?: string}} diet
 * @returns {string}
 */
export const getDietImage = diet => diet?.imageUrl || DEFAULT_DIET_IMAGE;
