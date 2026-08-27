export const FoodUnits = {
  Gramos: 'gramos',
  Kilos: 'kilos',
  Mililitros: 'ml',
  Litros: 'litros',
  Unidades: 'unidades',
  Tazas: 'tazas',
  Cucharadas: 'cucharadas',
  Cucharaditas: 'cucharaditas',
  Porciones: 'porciones',
  Rebanadas: 'rebanadas',
};

// Base de datos de alimentos con porciones referenciales
export const FOOD_DATABASE = [
  // 🥩 PROTEÍNAS
  {
    name: 'Pechuga de pollo sin piel',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['pollo', 'pechuga de pollo', 'pollo sin piel'],
    calories: 165, // por 100g
    protein: 31, // por 100g
  },
  {
    name: 'Carne vacuna magra',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['carne', 'vaca', 'ternera'],
    calories: 158,
    protein: 26,
  },
  {
    name: 'Lomo de cerdo',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['cerdo', 'lomo cerdo'],
    calories: 143,
    protein: 26,
  },
  {
    name: 'Clara de huevo',
    category: 'proteinas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['claras', 'clara'],
    calories: 17, // por unidad (33g aprox)
    protein: 3.6, // por unidad
  },
  {
    name: 'Pescado blanco',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['merluza', 'lenguado', 'pescado'],
    calories: 82,
    protein: 19,
  },
  {
    name: 'Pescado azul',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['atún', 'caballa', 'salmón'],
    calories: 206,
    protein: 25,
  },
  {
    name: 'Mariscos',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['camarón', 'mejillón', 'langostino'],
    calories: 85,
    protein: 18,
  },
  {
    name: 'Hígado de vaca',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['hígado', 'corazón'],
    calories: 135,
    protein: 20,
  },
  {
    name: 'Pavo',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    calories: 135,
    protein: 30,
  },
  {
    name: 'Conejo',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    calories: 173,
    protein: 33,
  },
  {
    name: 'Leche descremada',
    category: 'proteinas',
    suggestedQuantity: 200,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['leche', 'leche 0%'],
    calories: 68, // por 200ml
    protein: 6.8, // por 200ml
  },
  {
    name: 'Yogur descremado',
    category: 'proteinas',
    suggestedQuantity: 170,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['yogurt', 'yogur'],
    calories: 92, // por 170g
    protein: 8.8, // por 170g
  },
  {
    name: 'Queso port salut light',
    category: 'proteinas',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['queso light', 'port salut'],
    calories: 75, // por 30g
    protein: 7.8, // por 30g
  },
  {
    name: 'Ricota descremada',
    category: 'proteinas',
    suggestedQuantity: 50,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['ricotta', 'ricota'],
    calories: 69, // por 50g
    protein: 5.5, // por 50g
  },
  {
    name: 'Yogur griego descremado',
    category: 'proteinas',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['skyr', 'yogur griego', 'yogurt griego'],
    calories: 90, // por 150g
    protein: 15, // por 150g
  },
  {
    name: 'Queso cottage',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['cottage'],
    calories: 98,
    protein: 11,
  },
  {
    name: 'Carne de búfalo magra',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['búfalo', 'buffalo'],
    calories: 143,
    protein: 28,
  },
  {
    name: 'Surubí',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['dorado', 'surubí'],
    calories: 96,
    protein: 21,
  },
  {
    name: 'Polvo de proteína',
    category: 'proteinas',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['whey', 'proteína en polvo', 'protein powder'],
    calories: 120, // por 30g
    protein: 24, // por 30g
  },
  {
    name: 'Soja texturizada seca',
    category: 'proteinas',
    suggestedQuantity: 50,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['soja texturizada', 'soya texturizada'],
    calories: 172, // por 50g
    protein: 26, // por 50g
  },
  {
    name: 'Tempeh',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    calories: 193,
    protein: 19,
  },
  {
    name: 'Seitán',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    calories: 370,
    protein: 75,
  },
  {
    name: 'Lentejas cocidas',
    category: 'proteinas',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['lentejas'],
    calories: 172, // por 150g
    protein: 13.5, // por 150g
  },
  {
    name: 'Garbanzos cocidos',
    category: 'proteinas',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['garbanzos'],
    calories: 246, // por 150g
    protein: 12, // por 150g
  },
  {
    name: 'Porotos cocidos',
    category: 'proteinas',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['frijoles', 'alubias', 'porotos'],
    calories: 186, // por 150g
    protein: 13.5, // por 150g
  },
  {
    name: 'Arvejas cocidas',
    category: 'proteinas',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['guisantes', 'arvejas'],
    calories: 126, // por 150g
    protein: 12, // por 150g
  },
  {
    name: 'Tofu firme',
    category: 'proteinas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['tofu'],
    calories: 144,
    protein: 15,
  },
  {
    name: 'Spirulina en polvo',
    category: 'proteinas',
    suggestedQuantity: 10,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['spirulina'],
    calories: 29, // por 10g
    protein: 5.7, // por 10g
  },
  {
    name: 'Leche de soja fortificada',
    category: 'proteinas',
    suggestedQuantity: 200,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['leche de soya'],
    calories: 86, // por 200ml
    protein: 6.8, // por 200ml
  },

  // 🍞 CARBOHIDRATOS
  {
    name: 'Azúcar blanca',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['azúcar', 'azucar'],
    calories: 48, // por 1 cucharada (12g)
    protein: 0,
  },
  {
    name: 'Miel',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    calories: 64, // por 1 cucharada (21g)
    protein: 0.1,
  },
  {
    name: 'Frutas frescas',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['fruta', 'manzana', 'pera', 'naranja', 'banana'],
    calories: 80, // promedio por pieza mediana
    protein: 0.5,
  },
  {
    name: 'Jugo exprimido',
    category: 'carbohidratos',
    suggestedQuantity: 200,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['jugo', 'zumo'],
    calories: 90, // por 200ml
    protein: 1.4,
  },
  {
    name: 'Mermelada sin azúcar',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['mermelada', 'dulce sin azúcar'],
    calories: 20, // por 1 cucharada (20g)
    protein: 0.1,
  },
  {
    name: 'Compota de manzana',
    category: 'carbohidratos',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['compota'],
    calories: 42,
    protein: 0.2,
  },
  {
    name: 'Dulce de membrillo light',
    category: 'carbohidratos',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['dulce de membrillo', 'dulce de batata light'],
    calories: 60, // por 30g
    protein: 0.1,
  },
  {
    name: 'Pasas de uva',
    category: 'carbohidratos',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['pasas', 'uvas pasas'],
    calories: 90, // por 30g
    protein: 0.9,
  },
  {
    name: 'Ciruelas secas',
    category: 'carbohidratos',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['ciruelas deshidratadas'],
    calories: 72, // por 30g
    protein: 0.7,
  },
  {
    name: 'Dátil seco',
    category: 'carbohidratos',
    suggestedQuantity: 2,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['dátiles', 'datil'],
    calories: 40, // por 2 unidades (14g)
    protein: 0.3,
  },
  {
    name: 'Galletas de arroz simples',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['galletas de arroz'],
    calories: 35, // por 1 galleta (9g)
    protein: 0.7,
  },
  {
    name: 'Arroz blanco cocido',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['arroz blanco', 'arroz'],
    calories: 195, // por 150g
    protein: 4.5,
  },
  {
    name: 'Bebida deportiva',
    category: 'carbohidratos',
    suggestedQuantity: 200,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['gatorade', 'powerade'],
    calories: 50, // por 200ml
    protein: 0,
  },
  {
    name: 'Galletitas de agua',
    category: 'carbohidratos',
    suggestedQuantity: 3,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['crackers', 'galletas de agua'],
    calories: 60, // por 3 unidades (15g)
    protein: 1.2,
  },
  {
    name: 'Pan blanco',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Rebanadas,
    aliases: ['pan'],
    calories: 67, // por 1 rebanada (25g)
    protein: 2.3,
  },
  {
    name: 'Avena arrollada cruda',
    category: 'carbohidratos',
    suggestedQuantity: 40,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['avena', 'copos de avena'],
    calories: 154, // por 40g
    protein: 5.4,
  },
  {
    name: 'Arroz integral cocido',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['arroz integral'],
    calories: 165, // por 150g
    protein: 3.8,
  },
  {
    name: 'Pan integral',
    category: 'carbohidratos',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Rebanadas,
    aliases: ['pan integral'],
    calories: 69, // por 1 rebanada (25g)
    protein: 3.6,
  },
  {
    name: 'Papa cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['papa', 'patata'],
    calories: 129, // por 150g
    protein: 3,
  },
  {
    name: 'Batata cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['boniato', 'camote', 'batata'],
    calories: 129, // por 150g
    protein: 2.3,
  },
  {
    name: 'Fideos integrales cocidos',
    category: 'carbohidratos',
    suggestedQuantity: 120,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['pasta integral', 'fideos'],
    calories: 156, // por 120g
    protein: 6.8,
  },
  {
    name: 'Polenta cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['polenta'],
    calories: 105, // por 150g
    protein: 2.4,
  },
  {
    name: 'Mandioca cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['yuca', 'casava', 'mandioca'],
    calories: 240, // por 150g
    protein: 2.3,
  },
  {
    name: 'Harina de maíz cruda',
    category: 'carbohidratos',
    suggestedQuantity: 50,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['harina de maíz'],
    calories: 181, // por 50g
    protein: 4.1,
  },
  {
    name: 'Fainá',
    category: 'carbohidratos',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['harina de garbanzo cocida'],
    calories: 200,
    protein: 8,
  },
  {
    name: 'Quínoa cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['quinoa', 'quínoa'],
    calories: 171, // por 150g
    protein: 6.3,
  },
  {
    name: 'Trigo sarraceno cocido',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['alforfón', 'buckwheat'],
    calories: 138, // por 150g
    protein: 5.7,
  },
  {
    name: 'Cebada perlada cocida',
    category: 'carbohidratos',
    suggestedQuantity: 150,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['cebada'],
    calories: 186, // por 150g
    protein: 5.4,
  },

  // 🥑 GRASAS
  {
    name: 'Aceite de oliva extra virgen',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['aceite de oliva', 'aove'],
    calories: 119, // por 1 cucharada (13.5g)
    protein: 0,
  },
  {
    name: 'Aceite de girasol',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    calories: 119,
    protein: 0,
  },
  {
    name: 'Aceite de maíz',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    calories: 119,
    protein: 0,
  },
  {
    name: 'Aceite de canola',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    calories: 119,
    protein: 0,
  },
  {
    name: 'Aceite de soja',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['aceite de soya'],
    calories: 119,
    protein: 0,
  },
  {
    name: 'Palta',
    category: 'grasas',
    suggestedQuantity: 100,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['aguacate', 'avocado'],
    calories: 160,
    protein: 2,
  },
  {
    name: 'Almendras',
    category: 'grasas',
    suggestedQuantity: 15,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['almendra'],
    calories: 86, // por 15g
    protein: 3.2,
  },
  {
    name: 'Nueces',
    category: 'grasas',
    suggestedQuantity: 15,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['nuez'],
    calories: 98, // por 15g
    protein: 2.3,
  },
  {
    name: 'Castañas de cajú',
    category: 'grasas',
    suggestedQuantity: 15,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['anacardos', 'cajú'],
    calories: 83, // por 15g
    protein: 2.7,
  },
  {
    name: 'Pistachos',
    category: 'grasas',
    suggestedQuantity: 15,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['pistacho'],
    calories: 86, // por 15g
    protein: 3,
  },
  {
    name: 'Pecanas',
    category: 'grasas',
    suggestedQuantity: 15,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['pacanas', 'pecan'],
    calories: 104, // por 15g
    protein: 1.4,
  },
  {
    name: 'Maní natural',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['cacahuete', 'maní'],
    calories: 94, // por 1 cucharada (16g)
    protein: 3.8,
  },
  {
    name: 'Manteca de maní natural',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['mantequilla de maní', 'pasta de maní'],
    calories: 94, // por 1 cucharada (16g)
    protein: 3.8,
  },
  {
    name: 'Semillas de chía',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['chía'],
    calories: 58, // por 1 cucharada (12g)
    protein: 2,
  },
  {
    name: 'Semillas de lino molidas',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['linaza', 'lino'],
    calories: 37, // por 1 cucharada (7g)
    protein: 1.3,
  },
  {
    name: 'Semillas de sésamo',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['ajonjolí', 'sésamo'],
    calories: 52, // por 1 cucharada (9g)
    protein: 1.6,
  },
  {
    name: 'Semillas de girasol',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['pipas'],
    calories: 51, // por 1 cucharada (8.5g)
    protein: 2.1,
  },
  {
    name: 'Tahini',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['pasta de sésamo'],
    calories: 89, // por 1 cucharada (15g)
    protein: 2.6,
  },
  {
    name: 'Aceitunas',
    category: 'grasas',
    suggestedQuantity: 5,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['olivas'],
    calories: 25, // por 5 unidades (20g)
    protein: 0.2,
  },
  {
    name: 'Leche de coco espesa',
    category: 'grasas',
    suggestedQuantity: 50,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['leche de coco'],
    calories: 115, // por 50ml
    protein: 1.2,
  },
  {
    name: 'Yema de huevo',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Unidades,
    aliases: ['yema'],
    calories: 55, // por 1 yema (17g)
    protein: 2.7,
  },
  {
    name: 'Queso duro',
    category: 'grasas',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['queso curado'],
    calories: 121, // por 30g
    protein: 7.8,
  },
  {
    name: 'Queso semiduro entero',
    category: 'grasas',
    suggestedQuantity: 30,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['queso'],
    calories: 113, // por 30g
    protein: 7,
  },
  {
    name: 'Manteca',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharaditas,
    aliases: ['mantequilla'],
    calories: 34, // por 1 cucharadita (4.7g)
    protein: 0,
  },
  {
    name: 'Ghee',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharaditas,
    calories: 42, // por 1 cucharadita (4.7g)
    protein: 0,
  },
  {
    name: 'Crema de leche',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    aliases: ['nata'],
    calories: 51, // por 1 cucharada (15g)
    protein: 0.4,
  },
  {
    name: 'Aceite de coco',
    category: 'grasas',
    suggestedQuantity: 1,
    suggestedUnit: FoodUnits.Cucharadas,
    calories: 117, // por 1 cucharada (13.6g)
    protein: 0,
  },
  {
    name: 'Chocolate amargo',
    category: 'grasas',
    suggestedQuantity: 20,
    suggestedUnit: FoodUnits.Gramos,
    aliases: ['chocolate negro', 'chocolate 85%'],
    calories: 109, // por 20g
    protein: 2.4,
  },
  {
    name: 'Leche entera',
    category: 'grasas',
    suggestedQuantity: 200,
    suggestedUnit: FoodUnits.Mililitros,
    aliases: ['leche completa'],
    calories: 124, // por 200ml
    protein: 6.6,
  },
];

export const FOOD_DATABASE_DROPDOWN_ITEMS = [
  // 🥩 PROTEÍNAS
  {label: 'Pechuga de pollo sin piel', value: 'Pechuga de pollo sin piel'},
  {label: 'Carne vacuna magra', value: 'Carne vacuna magra'},
  {label: 'Lomo de cerdo', value: 'Lomo de cerdo'},
  {label: 'Clara de huevo', value: 'Clara de huevo'},
  {label: 'Pescado blanco', value: 'Pescado blanco'},
  {label: 'Pescado azul', value: 'Pescado azul'},
  {label: 'Mariscos', value: 'Mariscos'},
  {label: 'Hígado de vaca', value: 'Hígado de vaca'},
  {label: 'Pavo', value: 'Pavo'},
  {label: 'Conejo', value: 'Conejo'},
  {label: 'Leche descremada', value: 'Leche descremada'},
  {label: 'Yogur descremado', value: 'Yogur descremado'},
  {label: 'Queso port salut light', value: 'Queso port salut light'},
  {label: 'Ricota descremada', value: 'Ricota descremada'},
  {label: 'Yogur griego descremado', value: 'Yogur griego descremado'},
  {label: 'Queso cottage', value: 'Queso cottage'},
  {label: 'Carne de búfalo magra', value: 'Carne de búfalo magra'},
  {label: 'Surubí', value: 'Surubí'},
  {label: 'Polvo de proteína', value: 'Polvo de proteína'},
  {label: 'Soja texturizada seca', value: 'Soja texturizada seca'},
  {label: 'Tempeh', value: 'Tempeh'},
  {label: 'Seitán', value: 'Seitán'},
  {label: 'Lentejas cocidas', value: 'Lentejas cocidas'},
  {label: 'Garbanzos cocidos', value: 'Garbanzos cocidos'},
  {label: 'Porotos cocidos', value: 'Porotos cocidos'},
  {label: 'Arvejas cocidas', value: 'Arvejas cocidas'},
  {label: 'Tofu firme', value: 'Tofu firme'},
  {label: 'Spirulina en polvo', value: 'Spirulina en polvo'},
  {label: 'Leche de soja fortificada', value: 'Leche de soja fortificada'},

  // 🍞 CARBOHIDRATOS
  {label: 'Azúcar blanca', value: 'Azúcar blanca'},
  {label: 'Miel', value: 'Miel'},
  {label: 'Frutas frescas', value: 'Frutas frescas'},
  {label: 'Jugo exprimido', value: 'Jugo exprimido'},
  {label: 'Mermelada sin azúcar', value: 'Mermelada sin azúcar'},
  {label: 'Compota de manzana', value: 'Compota de manzana'},
  {label: 'Dulce de membrillo light', value: 'Dulce de membrillo light'},
  {label: 'Pasas de uva', value: 'Pasas de uva'},
  {label: 'Ciruelas secas', value: 'Ciruelas secas'},
  {label: 'Dátil seco', value: 'Dátil seco'},
  {label: 'Galletas de arroz simples', value: 'Galletas de arroz simples'},
  {label: 'Arroz blanco cocido', value: 'Arroz blanco cocido'},
  {label: 'Bebida deportiva', value: 'Bebida deportiva'},
  {label: 'Galletitas de agua', value: 'Galletitas de agua'},
  {label: 'Pan blanco', value: 'Pan blanco'},
  {label: 'Avena arrollada cruda', value: 'Avena arrollada cruda'},
  {label: 'Arroz integral cocido', value: 'Arroz integral cocido'},
  {label: 'Pan integral', value: 'Pan integral'},
  {label: 'Papa cocida', value: 'Papa cocida'},
  {label: 'Batata cocida', value: 'Batata cocida'},
  {label: 'Fideos integrales cocidos', value: 'Fideos integrales cocidos'},
  {label: 'Polenta cocida', value: 'Polenta cocida'},
  {label: 'Mandioca cocida', value: 'Mandioca cocida'},
  {label: 'Harina de maíz cruda', value: 'Harina de maíz cruda'},
  {label: 'Fainá', value: 'Fainá'},
  {label: 'Quínoa cocida', value: 'Quínoa cocida'},
  {label: 'Trigo sarraceno cocido', value: 'Trigo sarraceno cocido'},
  {label: 'Cebada perlada cocida', value: 'Cebada perlada cocida'},

  // 🥑 GRASAS
  {
    label: 'Aceite de oliva extra virgen',
    value: 'Aceite de oliva extra virgen',
  },
  {label: 'Aceite de girasol', value: 'Aceite de girasol'},
  {label: 'Aceite de maíz', value: 'Aceite de maíz'},
  {label: 'Aceite de canola', value: 'Aceite de canola'},
  {label: 'Aceite de soja', value: 'Aceite de soja'},
  {label: 'Palta', value: 'Palta'},
  {label: 'Almendras', value: 'Almendras'},
  {label: 'Nueces', value: 'Nueces'},
  {label: 'Castañas de cajú', value: 'Castañas de cajú'},
  {label: 'Pistachos', value: 'Pistachos'},
  {label: 'Pecanas', value: 'Pecanas'},
  {label: 'Maní natural', value: 'Maní natural'},
  {label: 'Manteca de maní natural', value: 'Manteca de maní natural'},
  {label: 'Semillas de chía', value: 'Semillas de chía'},
  {label: 'Semillas de lino molidas', value: 'Semillas de lino molidas'},
  {label: 'Semillas de sésamo', value: 'Semillas de sésamo'},
  {label: 'Semillas de girasol', value: 'Semillas de girasol'},
  {label: 'Tahini', value: 'Tahini'},
  {label: 'Aceitunas', value: 'Aceitunas'},
  {label: 'Leche de coco espesa', value: 'Leche de coco espesa'},
  {label: 'Yema de huevo', value: 'Yema de huevo'},
  {label: 'Queso duro', value: 'Queso duro'},
  {label: 'Queso semiduro entero', value: 'Queso semiduro entero'},
  {label: 'Manteca', value: 'Manteca'},
  {label: 'Ghee', value: 'Ghee'},
  {label: 'Crema de leche', value: 'Crema de leche'},
  {label: 'Aceite de coco', value: 'Aceite de coco'},
  {label: 'Chocolate amargo', value: 'Chocolate amargo'},
  {label: 'Leche entera', value: 'Leche entera'},
];

// Uso:
// export const FOOD_DATABASE_DROPDOWN_ITEMS_TRANSFORMED = transformDropdownItems(ORIGINAL_ARRAY);

// // Exportar para uso en Node.js
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = {
//     MealTime,
//     TimeUnit,
//     FoodUnits,
//     FOOD_DATABASE,
//   };
// }
