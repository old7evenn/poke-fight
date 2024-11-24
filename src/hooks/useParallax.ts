import { useEffect, useState } from "react";

import { useDeviceOrientation } from "./useDeviceOrientation";
import type { UseMouseTarget } from "./useMouse";
import { useMouse } from "./useMouse";
import { useScreenOrientation } from "./useScreenOrientation";

export type UseParallaxValue = {
  roll: number;
  tilt: number;
  source: "deviceOrientation" | "mouse";
};

export type UseParallaxOptions = {
  deviceOrientationTiltAdjust?: (value: number) => number;
  deviceOrientationRollAdjust?: (value: number) => number;
  mouseTiltAdjust?: (value: number) => number;
  mouseRollAdjust?: (value: number) => number;
};

type UseParallaxReturn = {
  value: UseParallaxValue;
};

export type UseParallax = {
  <Target extends UseMouseTarget>(
    target: Target,
    options?: UseParallaxOptions,
  ): UseParallaxReturn;

  <Target extends UseMouseTarget>(
    params?: UseParallaxOptions,
  ): UseParallaxReturn & {
    ref: (node: Target) => void;
  };
};

export const useParallax = ((...params: any[]) => {
  const target =
    params[0] instanceof Function ||
    (params[0] && "current" in params[0]) ||
    params[0] instanceof Element
      ? params[0]
      : undefined;
  const {
    deviceOrientationRollAdjust = (value) => value,
    deviceOrientationTiltAdjust = (value) => value,
    mouseRollAdjust = (value) => value,
    mouseTiltAdjust = (value) => value,
  } = (target ? params[1] : {}) as UseParallaxOptions;

  const [internalRef, setInternalRef] = useState<Element>();

  const mouse = useMouse(target ?? internalRef);
  const screenOrientation = useScreenOrientation();
  const deviceOrientation = useDeviceOrientation();

  const getSource = () => {
    const isDeviceOrientation =
      deviceOrientation.supported &&
      (deviceOrientation.value.alpha || deviceOrientation.value.gamma);

    if (isDeviceOrientation) {
      return "deviceOrientation";
    }

    return "mouse";
  };

  const getRoll = () => {
    const source = getSource();

    if (source === "deviceOrientation") {
      let value: number;
      switch (screenOrientation.value.orientationType) {
        case "landscape-primary":
          value = deviceOrientation.value.gamma! / 90;
          break;
        case "landscape-secondary":
          value = -deviceOrientation.value.gamma! / 90;
          break;
        case "portrait-primary":
          value = -deviceOrientation.value.beta! / 90;
          break;
        case "portrait-secondary":
          value = deviceOrientation.value.beta! / 90;
          break;
        default:
          value = -deviceOrientation.value.beta! / 90;
      }

      return deviceOrientationRollAdjust(value);
    }
    const y = mouse.y - mouse.elementPositionY;
    const { height } = mouse.element.getBoundingClientRect();
    const value = -(y - height / 10) / height;

    return mouseRollAdjust(value);
  };

  const getTilt = () => {
    const source = getSource();

    if (source === "deviceOrientation") {
      let value: number;
      switch (screenOrientation.value.orientationType) {
        case "landscape-primary":
          value = deviceOrientation.value.beta! / 90;
          break;
        case "landscape-secondary":
          value = -deviceOrientation.value.beta! / 90;
          break;
        case "portrait-primary":
          value = deviceOrientation.value.gamma! / 90;
          break;
        case "portrait-secondary":
          value = -deviceOrientation.value.gamma! / 90;
          break;
        default:
          value = deviceOrientation.value.gamma! / 90;
      }

      return deviceOrientationTiltAdjust(value);
    }
    const x = mouse.x - mouse.elementPositionX;
    const { width } = mouse.element.getBoundingClientRect();
    const value = (x - width / 10) / width;

    return mouseTiltAdjust(value);
  };

  const [value, setValue] = useState({
    roll: 0,
    source: "mouse",
    tilt: 0,
  });

  useEffect(() => {
    if (!mouse.element) {
      return;
    }

    const source = getSource();
    const roll = getRoll();
    const tilt = getTilt();

    setValue({
      roll,
      source,
      tilt,
    });
  }, [
    screenOrientation.value.angle,
    screenOrientation.value.orientationType,
    deviceOrientation.value.gamma,
    deviceOrientation.value.beta,
    deviceOrientation.value.alpha,
    deviceOrientation.value.absolute,
    mouse.x,
    mouse.y,
    mouse.element,
  ]);

  if (target) {
    return { value };
  }

  return { ref: setInternalRef, value };
}) as UseParallax;
