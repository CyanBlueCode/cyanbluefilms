/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Combines two image arrays with optional shuffling
 * @param {Array} arrayA - Primary images array
 * @param {Array} arrayB - Secondary images array
 * @param {boolean} shuffle - Whether to shuffle within each array
 * @returns {Array} Combined array (A first, then B)
 */
export const combineImageArrays = (arrayA, arrayB, shuffle = true) => {
  const processedA = shuffle ? shuffleArray(arrayA) : arrayA;
  const processedB = shuffle ? shuffleArray(arrayB) : arrayB;
  return [...processedA, ...processedB];
};
