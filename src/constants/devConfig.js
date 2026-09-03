/**
 * Configuración centralizada de valores de debug para desarrollo.
 *
 * Cuando IS_DEV_MODE es true, los formularios se pre-llenan con estos valores
 * para evitar tipear datos manualmente en cada prueba.
 * Cuando es false, todos los valores quedan vacíos (comportamiento de producción).
 */

const IS_DEV_MODE = __DEV__;

// ── Generador de identidades argentinas ──────────────────
// Se evalúa UNA vez al importar el módulo: cada reload de Metro
// produce una identidad nueva. Útil para testear signup sin
// pisar el mismo usuario.
const ARG_FIRST_NAMES = [
  'Mateo',
  'Joaquín',
  'Benjamín',
  'Bautista',
  'Thiago',
  'Lautaro',
  'Valentino',
  'Santino',
  'Tomás',
  'Lorenzo',
  'Bruno',
  'Facundo',
  'Ignacio',
  'Franco',
  'Agustín',
  'Nicolás',
  'Martín',
  'Gonzalo',
  'Sofía',
  'Catalina',
  'Mía',
  'Emma',
  'Olivia',
  'Martina',
  'Valentina',
  'Renata',
  'Isabella',
  'Julieta',
  'Lucía',
  'Camila',
];

const ARG_LAST_NAMES = [
  'González',
  'Rodríguez',
  'Fernández',
  'López',
  'Martínez',
  'Pérez',
  'García',
  'Sánchez',
  'Romero',
  'Sosa',
  'Álvarez',
  'Torres',
  'Ruiz',
  'Ramírez',
  'Flores',
  'Acosta',
  'Benítez',
  'Medina',
  'Suárez',
  'Herrera',
  'Aguirre',
  'Ríos',
  'Molina',
  'Castro',
];

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

const generateArgentineIdentity = () => {
  const firstName = pickRandom(ARG_FIRST_NAMES);
  const lastName = pickRandom(ARG_LAST_NAMES);
  // Normalizo acentos para username y email (evita problemas con el backend)
  const normalize = str =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const suffix = Math.floor(Math.random() * 10000);
  const username = `${normalize(firstName)}${normalize(lastName)}${suffix}`;
  const signUpEmail = `${username}@test.com`;
  return {firstName, lastName, username, signUpEmail};
};

const RANDOM_IDENTITY = generateArgentineIdentity();

const DEV_VALUES = {
  // ── Auth (login con cuenta real existente) ────────────
  email: 'nicochamp@live.com',
  password: 'Alterno_2',
  showPassword: true,

  // ── SignUp (identidad random por reload) ──────────────
  firstName: RANDOM_IDENTITY.firstName,
  lastName: RANDOM_IDENTITY.lastName,
  signUpEmail: RANDOM_IDENTITY.signUpEmail,

  // ── Onboarding Champ (General) ────────────────────────
  dietPreferences: 'BAJO_EN_CARBOHIDRATOS',
  otherConsiderations: 'Ninguna',
  foodPerDay: '2',
  placeToTrain: 'CASA',
  lastInjuries: 'Ninguna',
  trainPerWeek: '2',
  trainDuration: '30',

  // ── Onboarding Champ (GeneralSecondPart) ──────────────
  dateOfBirth: '01/01/1999',
  mobileNumber: '+5491133334444',
  address: 'Avenida 123',
  apartment: '4F',
  zipCode: '1000',
  city: 'Buenos Aires',
  province: 'Buenos Aires',
  gender: 'MASCULINO',

  // ── Onboarding Trainer ────────────────────────────────
  specialties: ['Crossfit', 'Funcional'],
  experienceYears: '3',

  // ── Create Diet ───────────────────────────────────────
  dietName: 'Dieta de prueba',
  dietDescription: 'Descripción de dieta para testing',
  dietDurationNumber: '30',
  dietDurationUnit: 'días',

  // ── Create Routine ────────────────────────────────────
  routineName: 'Rutina de prueba',
  routineType: 'FUERZA',
  routineDescription: 'Descripción de rutina para testing',
  routineShortDescription: 'Rutina test',
  routineEstimatedDuration: 45,
  routineDurationNumber: '3',
  routineDurationUnit: 'días',
  routineMuscleGroup: 'PECHO',

  // ── Exercise defaults ─────────────────────────────────
  exerciseName: 'Press de banca',
  exerciseSets: 4,
  exerciseReps: 12,
  exerciseRestTime: '60',
  exerciseIntensity: 'ALTA',
  exerciseWeightSet: 1,

  // ── Trainer Feedback ──────────────────────────────────
  feedbackRating: 4,
  feedbackReview: 'Muy buen entrenador, lo recomiendo.',

  // ── Profile (Champ extras) ────────────────────────────
  goal: 'GANAR_MUSCULO',
  experienceLevel: 'INTERMEDIO',
  height: '175',
  weight: '75',
  activityLevel: 'MODERADO',
};

const EMPTY_VALUES = Object.fromEntries(
  Object.entries(DEV_VALUES).map(([key, value]) => {
    if (typeof value === 'boolean') return [key, false];
    if (typeof value === 'number') return [key, null];
    if (Array.isArray(value)) return [key, []];
    return [key, ''];
  }),
);

const devConfig = IS_DEV_MODE ? DEV_VALUES : EMPTY_VALUES;

export {IS_DEV_MODE};
export default devConfig;
