import { WHEEL_CONSTANTS } from '../config/constants';
import { normalizeAngle, getRandomInt } from '../config/utils';

export interface WheelCalculation {
  totalRotation: number;
  targetAngle: number;
  wheelRotationNeeded: number;
  rotationDelta: number;
  sectorCenterAngle: number;
  randomOffset: number;
}

export const calculateWheelRotation = (
  winningSectorIndex: number,
  sectorsLength: number,
  currentRotation: number,
  minSpins: number,
  maxSpins: number
): WheelCalculation => {
  const degreesPerSector = 360 / sectorsLength;
  
  const sectorCenterAngle = 
    WHEEL_CONSTANTS.FIRST_SECTOR_START + 
    winningSectorIndex * degreesPerSector + 
    degreesPerSector / 2;
  
  const halfSector = degreesPerSector / 2;
  const minOffset = -halfSector + WHEEL_CONSTANTS.SAFE_ZONE;
  const maxOffset = halfSector - WHEEL_CONSTANTS.SAFE_ZONE;
  const randomOffset = minOffset + Math.random() * (maxOffset - minOffset);
  
  const currentNormalized = normalizeAngle(currentRotation);
  
  let targetAngle = sectorCenterAngle + randomOffset;
  targetAngle = normalizeAngle(targetAngle);
  
  let wheelRotationNeeded = WHEEL_CONSTANTS.INDICATOR_ANGLE - targetAngle;
  wheelRotationNeeded = normalizeAngle(wheelRotationNeeded);
  
  let rotationDelta = wheelRotationNeeded - currentNormalized;
  while (rotationDelta < 0) rotationDelta += 360;
  while (rotationDelta >= 360) rotationDelta -= 360;
  
  const spins = getRandomInt(minSpins, maxSpins);
  const totalRotation = currentRotation + spins * 360 + rotationDelta;
  
  return {
    totalRotation,
    targetAngle,
    wheelRotationNeeded,
    rotationDelta,
    sectorCenterAngle,
    randomOffset,
  };
};
