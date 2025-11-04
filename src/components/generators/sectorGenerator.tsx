/**
 * SVG wheel generation
 * Based on design by Soma Szoboszlai
 * https://codepen.io/szsoma/pen/bYEXGx
 */

import { Sector } from '../../types';
import { WHEEL_CONSTANTS } from '../../core/config/constants';

const WHEEL_CENTER = 365;
const WHEEL_RADIUS = 329.1;
const TEXT_RADIUS_RATIO = 0.65;
const STICK_WIDTH = 9.3;
const STICK_HEIGHT = 24.33;

export const generateSectorPaths = (
  sectors: Sector[], 
  wheelColors: [string, string] = ['#fff', '#fff'],
  borderColor: string = '#000',
  borderWidth: number = 2,
  textFontSize: number = 18,
  textColor: string = '#fff'
) => {
  const degreesPerSector = 360 / sectors.length;
  
  return sectors.map((sector, index) => {
    const startAngle = index * degreesPerSector + WHEEL_CONSTANTS.FIRST_SECTOR_START;
    const endAngle = (index + 1) * degreesPerSector + WHEEL_CONSTANTS.FIRST_SECTOR_START;
    
    const x1 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos((startAngle * Math.PI) / 180);
    const y1 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin((startAngle * Math.PI) / 180);
    const x2 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos((endAngle * Math.PI) / 180);
    const y2 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArc = degreesPerSector > 180 ? 1 : 0;
    const path = `M ${WHEEL_CENTER},${WHEEL_CENTER} L ${x1},${y1} A ${WHEEL_RADIUS},${WHEEL_RADIUS} 0 ${largeArc},1 ${x2},${y2} Z`;
    
    const textAngle = (startAngle + endAngle) / 2;
    const textRadius = WHEEL_RADIUS * TEXT_RADIUS_RATIO;
    const textX = WHEEL_CENTER + textRadius * Math.cos((textAngle * Math.PI) / 180);
    const textY = WHEEL_CENTER + textRadius * Math.sin((textAngle * Math.PI) / 180);

    const sectorColor = wheelColors[index % wheelColors.length];
    
    const text = sector.text || sector.label;
    const maxCharsPerLine = Math.floor((WHEEL_RADIUS * 0.4) / (textFontSize * 0.6));
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    
    return (
      <g key={sector.id}>
        <path 
          d={path} 
          fill={sectorColor}
          stroke={borderWidth === 0 ? sectorColor : borderColor}
          strokeWidth={borderWidth === 0 ? 1 : borderWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <text
          fill={textColor}
          fontSize={textFontSize}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
          style={{ 
            pointerEvents: 'none', 
            userSelect: 'none',
            textTransform: 'uppercase'
          }}
        >
          {lines.map((line, i) => (
            <tspan
              key={i}
              x={textX}
              y={textY}
              dy={`${(i - (lines.length - 1) / 2) * 1.2}em`}
            >
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  });
};

export const generateSticks = (sectorsLength: number, sticksColor: string = '#fff') => {
  const degreesPerSector = 360 / sectorsLength;
  const sticks = [];
  
  for (let i = 0; i < sectorsLength; i++) {
    const angle = i * degreesPerSector;
    
    sticks.push(
      <rect
        key={i}
        x={WHEEL_CENTER - STICK_WIDTH / 2}
        y={5}
        width={STICK_WIDTH}
        height={STICK_HEIGHT}
        rx="4"
        ry="4"
        fill={sticksColor}
        transform={`rotate(${angle} ${WHEEL_CENTER} ${WHEEL_CENTER})`}
      />
    );
  }
  
  return sticks;
};
