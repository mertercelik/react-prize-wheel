/**
 * Prize Wheel Component
 * SVG design based on work by Soma Szoboszlai
 * https://codepen.io/szsoma/pen/bYEXGx
 */

import { useState, useImperativeHandle, forwardRef } from 'react';
import { PrizeWheelProps, PrizeWheelRef } from '../../types';
import { useWheelAnimation } from '../../hooks/useWheelAnimation';
import { generateSectorPaths, generateSticks } from '../generators/sectorGenerator';
import './PrizeWheel.css';

export const PrizeWheel = forwardRef<PrizeWheelRef, PrizeWheelProps>((props, ref) => {
  const {
    sectors,
    onSpinStart,
    onSpinEnd,
    duration = 4,
    minSpins = 5,
    maxSpins = 8,
    frameColor = '#ddd',
    middleColor = '#ddd',
    middleDotColor = '#bbb',
    winIndicatorColor = '#ddd',
    winIndicatorDotColor = '#bbb',
    sticksColor = '#ddd',
    wheelColors = ['#1592e8', '#14c187'],
    borderColor = '#ddd',
    borderWidth = 2,
    wheelShadowColor = '#000',
    wheelShadowOpacity = 0.15,
    middleShadowColor = '#000',
    middleShadowOpacity = 0.2,
    indicatorShadowColor = '#000',
    indicatorShadowOpacity = 0.22,
    textFontSize = 18,
    textColor = '#fff',
  } = props;
  if (sectors.length < 2 || sectors.length > 24) {
    throw new Error('Sector count must be between 2 and 24');
  }

  const [isSpinning, setIsSpinning] = useState(false);
  
  const { wheelRef, activeRef, spin: performSpin } = useWheelAnimation({
    sectors,
    duration,
    minSpins,
    maxSpins,
    onSpinEnd: (sector) => {
      setIsSpinning(false);
      onSpinEnd?.(sector);
    },
  });

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    onSpinStart?.();
    performSpin();
  };

  useImperativeHandle(ref, () => ({
    spin: handleSpin,
    isSpinning,
  }));

  return (
    <div className="prize-wheel-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 730" className="prize-wheel-svg">
        <g ref={wheelRef} className="wheel">
          <circle className="frame" cx="365" cy="365" r="347.6" fill={frameColor} />
          <g className="sticks">{generateSticks(sectors.length, sticksColor)}</g>
          <g className="sectors">{generateSectorPaths(sectors, wheelColors, borderColor, borderWidth, textFontSize, textColor)}</g>
        </g>
        <g opacity={wheelShadowOpacity}>
          <path d="M46.9,372.5c0-181.7,147.4-329,329.1-329A327.3,327.3,0,0,1,556.3,97.2,327.3,327.3,0,0,0,365,35.9C183.3,35.9,35.9,183.3,35.9,365c0,115.2,59.2,216.5,148.8,275.3C101.3,580.6,46.9,482.9,46.9,372.5Z" fill={wheelShadowColor} />
        </g>
        <g className="middle">
          <g opacity={middleShadowOpacity}>
            <circle cx="368.5" cy="368.5" r="54.5" fill={middleShadowColor} />
          </g>
          <g className="wheelMiddle">
            <circle cx="365" cy="365" r="54.5" fill={middleColor} />
          </g>
          <circle cx="365" cy="365" r="11.6" fill={middleDotColor} />
        </g>
        <g ref={activeRef} className="active">
          <g>
            <path
              d="M707,160.5c-11.4-17.9-35.8-22.8-54.5-11a41.7,41.7,0,0,0-13.6,14.1l-33.6,58.9a2.3,2.3,0,0,0,0,2.4,2.4,2.4,0,0,0,2.3,1.1l67.5-5.1a43.8,43.8,0,0,0,18.6-6.3C712.4,202.7,718.3,178.5,707,160.5Z"
              fill={indicatorShadowColor}
              fillOpacity={indicatorShadowOpacity}
            />
            <path
              className="winIndicator"
              d="M711.9,157.4a38.4,38.4,0,0,0-66,1.8l-31.5,57.5a2.1,2.1,0,0,0,0,2.4,2.6,2.6,0,0,0,2.2,1.2l65.6-3.9a39.6,39.6,0,0,0,17.9-5.9A38.5,38.5,0,0,0,711.9,157.4Z"
              fill={winIndicatorColor}
            />
            <path
              d="M681.7,166.9a9.3,9.3,0,0,0-6.6,4.8l-.8,2.1a14.9,14.9,0,0,0-.2,2.1,8.8,8.8,0,0,0,1.1,4.2,9.2,9.2,0,0,0,2.9,3,7.6,7.6,0,0,0,2.9,1.3l1.1.2a8.6,8.6,0,0,0,4.2-.6,8.4,8.4,0,0,0,3.4-2.5,7.4,7.4,0,0,0,2-3.8,8.5,8.5,0,0,0-.1-4.2,8.4,8.4,0,0,0-2.1-3.8,7.4,7.4,0,0,0-3.5-2.3l-1-.3A12.2,12.2,0,0,0,681.7,166.9Z"
              fill={winIndicatorDotColor}
            />
          </g>
        </g>
      </svg>
    </div>
  );
});

PrizeWheel.displayName = 'PrizeWheel';
