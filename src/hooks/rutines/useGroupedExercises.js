import {useState, useEffect} from 'react';

/**
 * Hook personalizado para agrupar y ordenar ejercicios
 * Agrupa ejercicios regulares y supersets, ordenándolos por order y suborder
 *
 * @param {Array} exercises - Array de ejercicios a agrupar
 * @returns {Array} Array de ejercicios agrupados y ordenados
 */
export const useGroupedExercises = exercises => {
  const [groupedExercises, setGroupedExercises] = useState([]);

  useEffect(() => {
    if (!exercises || !Array.isArray(exercises)) {
      setGroupedExercises([]);
      return;
    }

    const grouped = [];
    const supersetGroups = new Map();

    exercises.forEach(exercise => {
      if (exercise.superSetId) {
        // Si es un superset, agrupar por superSetId
        if (!supersetGroups.has(exercise.superSetId)) {
          supersetGroups.set(exercise.superSetId, []);
          // Agregar un marcador para saber dónde insertar el grupo
          grouped.push({
            type: 'superset',
            superSetId: exercise.superSetId,
            order: exercise.order,
            exercises: supersetGroups.get(exercise.superSetId),
          });
        }
        supersetGroups.get(exercise.superSetId).push(exercise);
      } else {
        // Si es un ejercicio regular, agregarlo directamente
        grouped.push({
          type: 'regular',
          order: exercise.order,
          exercise: exercise,
        });
      }
    });

    // Ordenar bloques por order
    grouped.sort((a, b) => a.order - b.order);

    // Ordenar ejercicios dentro de cada superset por suborder
    grouped.forEach(group => {
      if (group.type === 'superset') {
        group.exercises.sort((a, b) => (a.suborder || 0) - (b.suborder || 0));
      }
    });

    setGroupedExercises(grouped);
  }, [exercises]);

  return groupedExercises;
};
