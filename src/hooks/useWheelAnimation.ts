import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Sector } from '../types';
import { calculateWheelRotation } from '../core/algorithms/wheelAlgorithm';
import { shouldTriggerIndicator } from '../core/algorithms/indicatorAlgorithm';
import { createIndicatorAnimation, shouldPlayIndicator } from '../core/animations';
import { selectWinningSector } from '../core/algorithms/probabilitySelector';

interface UseWheelAnimationProps {
  sectors: Sector[];
  duration: number;
  minSpins: number;
  maxSpins: number;
  onSpinEnd?: (sector: Sector) => void;
}

export const useWheelAnimation = ({
  sectors,
  duration,
  minSpins,
  maxSpins,
  onSpinEnd,
}: UseWheelAnimationProps) => {
  const wheelRef = useRef<SVGGElement>(null);
  const activeRef = useRef<SVGGElement>(null);
  const lastRotation = useRef(0);
  const currentRotation = useRef(0);
  const lastTriggeredSector = useRef(-1);
  const indicatorTimeline = useRef<gsap.core.Timeline | null>(null);
  const spinTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!activeRef.current) return;

    indicatorTimeline.current = createIndicatorAnimation(activeRef.current);

    return () => {
      indicatorTimeline.current?.kill();
      spinTimeline.current?.kill();
    };
  }, []);

  const spin = () => {
    if (!wheelRef.current || !indicatorTimeline.current) return false;

    lastRotation.current = 0;
    lastTriggeredSector.current = -1;

    const winningSectorIndex = selectWinningSector(sectors);
    const calculation = calculateWheelRotation(
      winningSectorIndex,
      sectors.length,
      currentRotation.current,
      minSpins,
      maxSpins
    );

    spinTimeline.current = gsap.timeline({
      onComplete: () => {
        currentRotation.current = calculation.totalRotation;
        onSpinEnd?.(sectors[winningSectorIndex]);
      },
    });

    gsap.set(wheelRef.current, { force3D: true, willChange: 'transform' });

    spinTimeline.current.to(wheelRef.current, {
      rotation: calculation.totalRotation,
      transformOrigin: '50% 50%',
      ease: 'power3.out',
      duration: duration,
      force3D: true,
      onUpdate: () => {
        if (!indicatorTimeline.current) return;

        const rotation = gsap.getProperty(wheelRef.current, 'rotation') as number;
        const degreesPerSector = 360 / sectors.length;
        const currentSector = Math.floor(Math.round(rotation) / degreesPerSector);

        if (shouldTriggerIndicator(rotation, lastRotation.current, sectors.length)) {
          if (currentSector !== lastTriggeredSector.current) {
            if (shouldPlayIndicator(indicatorTimeline.current)) {
              indicatorTimeline.current.play(0);
              lastTriggeredSector.current = currentSector;
            }
          }
        }

        lastRotation.current = Math.round(rotation);
      },
      onComplete: () => {
        gsap.set(wheelRef.current, { willChange: 'auto' });
      },
    });

    return true;
  };

  return {
    wheelRef,
    activeRef,
    spin,
  };
};
