export interface Sector {
  id: number | string;
  label: string;
  probability?: number;
  text?: string;
}

export interface PrizeWheelRef {
  spin: () => void;
  isSpinning: boolean;
}

export interface PrizeWheelProps {
  sectors: Sector[];
  onSpinStart?: () => void;
  onSpinEnd?: (sector: Sector) => void;
  duration?: number;
  minSpins?: number;
  maxSpins?: number;
  frameColor?: string;
  middleColor?: string;
  middleDotColor?: string;
  winIndicatorColor?: string;
  winIndicatorDotColor?: string;
  sticksColor?: string;
  wheelColors?: [string, string];
  borderColor?: string;
  borderWidth?: number;
  wheelShadowColor?: string;
  wheelShadowOpacity?: number;
  middleShadowColor?: string;
  middleShadowOpacity?: number;
  indicatorShadowColor?: string;
  indicatorShadowOpacity?: number;
  textFontSize?: number;
  textColor?: string;
}
