const PALETTE = [
  {color: '#9B65FC', background: '#36294E'},
  {color: '#ED6455', background: '#4E2A25'},
  {color: '#F5C451', background: '#4E4425'},
  {color: '#5FD3C4', background: '#1F4640'},
  {color: '#F49AC2', background: '#4A2638'},
  {color: '#5AB6F2', background: '#1E3A4E'},
  {color: '#20D6D1', background: '#164546'},
  {color: '#F5945C', background: '#4E3420'},
  {color: '#8DA3F0', background: '#22264E'},
  {color: '#F55C7A', background: '#4E1F2A'},
  {color: '#66D97E', background: '#1F4E2A'},
];

// Asigna siempre el mismo color a un mismo grupo muscular (hash del texto),
// sin depender del orden en que aparece en la lista.
export function getMuscleGroupColor(muscleGroup) {
  if (!muscleGroup) {
    return PALETTE[0];
  }
  let hash = 0;
  for (let i = 0; i < muscleGroup.length; i++) {
    hash = (hash * 31 + muscleGroup.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
