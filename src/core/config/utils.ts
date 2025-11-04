export const normalizeAngle = (angle: number): number => {
  return ((angle % 360) + 360) % 360;
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
