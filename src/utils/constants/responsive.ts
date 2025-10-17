import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const wp = (percentage: number, min?: number, max?: number) => {
  const val = (width * percentage) / 100;
  if (min && val < min) return min;
  if (max && val > max) return max;
  return val;
};
export const hp = (percentage: number, min?: number, max?: number) => {
  const val = (height * percentage) / 100;
  if (min && val < min) return min;
  if (max && val > max) return max;
  return val;
};
export const fs = (size: number) => {
  const scaleFactor = width / 375;
  return Math.round(size * scaleFactor);
};
