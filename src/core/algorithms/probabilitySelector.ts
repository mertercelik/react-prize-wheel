import { Sector } from '../../types';

export const selectWinningSector = (sectors: Sector[]): number => {
  const totalProbability = sectors.reduce((sum, sector) => sum + (sector.probability ?? 1), 0);

  if (totalProbability <= 0) {
    return Math.floor(Math.random() * sectors.length);
  }

  let random = Math.random() * totalProbability;
  
  for (let i = 0; i < sectors.length; i++) {
    random -= sectors[i].probability ?? 1;
    if (random <= 0) return i;
  }
  
  return sectors.length - 1;
};
