import { useAnimation, useMotionValue, useTransform } from 'motion/react';

export const useAnimationCard = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-800, 800], [-20, 20]);
  const opacity = useTransform(x, [-400, 0, 400], [0.3, 1, 0.3]);
  const rotate = useTransform(() => `${rotateRaw.get()}deg`);

  return {
    x,
    controls,
    opacity,
    rotate,
  };
};
