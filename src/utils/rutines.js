/**
 * Calcula el estado de vencimiento de una rutina o dieta
 * @param {string} expirationDate - Fecha en formato ISO (2025-12-17T14:23:44.655Z)
 * @returns {Object|null} - { status: 'EXPIRING_SOON', daysRemaining: number } o { status: 'EXPIRED' }, null si no aplica
 */
export const getExpirationStatus = expirationDate => {
  if (!expirationDate) return null;

  const now = new Date();
  const expiration = new Date(expirationDate);
  const diffInMs = expiration - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return { status: 'EXPIRED' };
  }

  if (diffInDays <= 7) {
    return { status: 'EXPIRING_SOON', daysRemaining: diffInDays };
  }

  return null; // No mostrar badge
};

const RUTINE_TYPE_IMAGES = {
  GYM: 'https://images.pexels.com/photos/3838705/pexels-photo-3838705.jpeg?auto=compress&cs=tinysrgb&w=800',
  CARDIO: 'https://images.pexels.com/photos/4944975/pexels-photo-4944975.jpeg?auto=compress&cs=tinysrgb&w=800',
  CROSSFIT: 'https://images.pexels.com/photos/327295/pexels-photo-327295.jpeg?auto=compress&cs=tinysrgb&w=800',
  FUNCTIONAL: 'https://images.pexels.com/photos/4720539/pexels-photo-4720539.jpeg?auto=compress&cs=tinysrgb&w=800',
  PILATES: 'https://images.pexels.com/photos/25599825/pexels-photo-25599825.jpeg?auto=compress&cs=tinysrgb&w=800',
  YOGA: 'https://images.pexels.com/photos/6019798/pexels-photo-6019798.jpeg?auto=compress&cs=tinysrgb&w=800',
  SWIMMING: 'https://images.pexels.com/photos/260598/pexels-photo-260598.jpeg?auto=compress&cs=tinysrgb&w=800',
  RUNNING: 'https://images.pexels.com/photos/8454909/pexels-photo-8454909.jpeg?auto=compress&cs=tinysrgb&w=800',
  CYCLING: 'https://images.pexels.com/photos/128202/pexels-photo-128202.jpeg?auto=compress&cs=tinysrgb&w=800',
  CLIMBING: 'https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg?auto=compress&cs=tinysrgb&w=800',
  SKATEBOARD: 'https://images.pexels.com/photos/3809793/pexels-photo-3809793.jpeg?auto=compress&cs=tinysrgb&w=800',
  CALISTENIA: 'https://images.pexels.com/photos/7187955/pexels-photo-7187955.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const DEFAULT_RUTINE_IMAGE = RUTINE_TYPE_IMAGES.GYM;

/**
 * Devuelve la imagen a usar para una rutina: la propia si tiene, sino una
 * imagen por defecto según su rutineType.
 * @param {{imageUrl?: string, rutineType?: string}} rutine
 * @returns {string}
 */
export const getRutineImage = rutine => {
  if (rutine?.imageUrl) {
    return rutine.imageUrl;
  }

  return RUTINE_TYPE_IMAGES[rutine?.rutineType] || DEFAULT_RUTINE_IMAGE;
};
