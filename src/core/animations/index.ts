import gsap from 'gsap';
import { ANIMATION_CONFIG, WHEEL_CONSTANTS } from '../config/constants';

export const createIndicatorAnimation = (element: SVGGElement): gsap.core.Timeline => {
  gsap.set(element, { force3D: true });
  
  return gsap.timeline({ paused: true })
    .to(element, { 
      rotation: ANIMATION_CONFIG.INDICATOR_ROTATION_DOWN, 
      transformOrigin: ANIMATION_CONFIG.INDICATOR_TRANSFORM_ORIGIN, 
      ease: 'power1.out', 
      duration: 0.1,
      force3D: true
    })
    .to(element, { 
      rotation: 0, 
      ease: 'power2.out', 
      duration: 0.15,
      force3D: true
    });
};

export const shouldPlayIndicator = (
  timeline: gsap.core.Timeline | null
): boolean => {
  if (!timeline) return false;
  const progress = timeline.progress();
  return progress > WHEEL_CONSTANTS.INDICATOR_PROGRESS_THRESHOLD || progress === 0;
};
