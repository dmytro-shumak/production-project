import { useRef } from "react";

export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number = 1000,
) => {
  const lastRun = useRef(Date.now());
  return (...args: any[]) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  };
};
