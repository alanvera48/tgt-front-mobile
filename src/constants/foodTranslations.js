// Diccionario ES → EN para los alimentos más comunes en las dietas de la
// app. USDA FoodData Central solo indexa en inglés, así que sin esto una
// búsqueda de "zapallitos" o "palta" no devuelve nada.
//
// No pretende ser exhaustivo: cubre lo que hoy aparece en FOOD_DATABASE
// (constants/diets.js) más los vacíos más comunes que encontramos ahí
// (verduras y frutas). Se puede seguir agregando a medida que los
// entrenadores carguen alimentos nuevos que no encuentren resultados.
export const FOOD_TRANSLATIONS_ES_EN = {
  // Proteínas
  pollo: 'chicken breast',
  'pechuga de pollo': 'chicken breast',
  carne: 'beef',
  'carne vacuna': 'beef',
  ternera: 'veal',
  cerdo: 'pork',
  'lomo de cerdo': 'pork loin',
  claras: 'egg white',
  'clara de huevo': 'egg white',
  huevo: 'egg',
  merluza: 'hake',
  lenguado: 'sole fish',
  pescado: 'fish',
  atun: 'tuna',
  atún: 'tuna',
  salmon: 'salmon',
  salmón: 'salmon',
  camaron: 'shrimp',
  camarón: 'shrimp',
  langostino: 'prawn',
  mejillon: 'mussel',
  mejillón: 'mussel',
  higado: 'liver',
  hígado: 'liver',
  pavo: 'turkey',
  conejo: 'rabbit',
  leche: 'milk',
  'leche descremada': 'skim milk',
  yogur: 'yogurt',
  yogurt: 'yogurt',
  'yogur griego': 'greek yogurt',
  queso: 'cheese',
  ricota: 'ricotta cheese',
  cottage: 'cottage cheese',

  // Carbohidratos
  arroz: 'rice',
  'arroz blanco': 'white rice',
  'arroz integral': 'brown rice',
  pan: 'bread',
  'pan integral': 'whole wheat bread',
  avena: 'oats',
  papa: 'potato',
  batata: 'sweet potato',
  fideos: 'pasta',
  polenta: 'polenta',
  mandioca: 'cassava',
  quinoa: 'quinoa',
  quínoa: 'quinoa',
  lentejas: 'lentils',
  garbanzos: 'chickpeas',
  porotos: 'beans',
  arvejas: 'peas',

  // Verduras (gran ausente de FOOD_DATABASE hoy)
  espinaca: 'spinach',
  zapallito: 'zucchini',
  zapallitos: 'zucchini',
  zapallo: 'pumpkin',
  calabaza: 'pumpkin',
  zanahoria: 'carrot',
  tomate: 'tomato',
  lechuga: 'lettuce',
  cebolla: 'onion',
  brocoli: 'broccoli',
  brócoli: 'broccoli',
  coliflor: 'cauliflower',
  berenjena: 'eggplant',
  pepino: 'cucumber',
  remolacha: 'beet',
  choclo: 'corn',
  'ensalada mixta': 'mixed salad',
  ensalada: 'salad',

  // Frutas
  manzana: 'apple',
  banana: 'banana',
  platano: 'banana',
  plátano: 'banana',
  naranja: 'orange',
  palta: 'avocado',
  aguacate: 'avocado',
  frutilla: 'strawberry',
  frutillas: 'strawberry',
  uva: 'grape',
  pera: 'pear',
  durazno: 'peach',

  // Grasas / otros
  'aceite de oliva': 'olive oil',
  'aceite de girasol': 'sunflower oil',
  palta_grasa: 'avocado',
  nueces: 'walnuts',
  almendras: 'almonds',
  mani: 'peanuts',
  maní: 'peanuts',
};

const normalize = str => str?.toLowerCase().trim();

/**
 * Traduce un nombre de alimento en español a un término de búsqueda en
 * inglés para USDA FoodData Central. Si no hay traducción conocida,
 * devuelve el texto original (a veces alcanza: "banana", "salmon", etc.
 * ya se escriben igual en ambos idiomas).
 */
export const translateFoodToEnglish = foodNameEs => {
  const normalized = normalize(foodNameEs);
  if (!normalized) {
    return foodNameEs;
  }

  if (FOOD_TRANSLATIONS_ES_EN[normalized]) {
    return FOOD_TRANSLATIONS_ES_EN[normalized];
  }

  // Búsqueda parcial: "Merluza al horno" contiene "merluza".
  const partialMatch = Object.keys(FOOD_TRANSLATIONS_ES_EN).find(
    key => normalized.includes(key) || key.includes(normalized),
  );
  if (partialMatch) {
    return FOOD_TRANSLATIONS_ES_EN[partialMatch];
  }

  return foodNameEs;
};
