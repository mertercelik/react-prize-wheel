import { getIndicatorOffset } from '../config/constants';
import { normalizeAngle } from '../config/utils';

export const shouldTriggerIndicator = (
  rotation: number,
  lastRotation: number,
  sectorsLength: number
): boolean => {
  const currentRounded = Math.round(rotation);
  const tolerance = currentRounded - lastRotation;
  
  if (tolerance <= 0) return false;
  
  const degreesPerSector = 360 / sectorsLength;
  const offset = getIndicatorOffset();
  const adjustedRotation = currentRounded - offset;
  const normalizedRotation = normalizeAngle(adjustedRotation);
  
  return normalizedRotation % degreesPerSector <= tolerance;
};
