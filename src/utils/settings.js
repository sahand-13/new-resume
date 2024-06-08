// config
import { defaultSettings, cookiesKey } from '../config';

// ----------------------------------------------------------------------

export const getSettings = (cookiesStore) => {
  const themeMode = getData(cookiesStore[cookiesKey.themeMode]) || defaultSettings.themeMode;
  const themeDirection = getData(cookiesStore[cookiesKey.themeDirection]) || defaultSettings.themeDirection;

  const themeColorPresets = getData(cookiesStore[cookiesKey.themeColorPresets]) || defaultSettings.themeColorPresets;

  const themeLayout = getData(cookiesStore[cookiesKey.themeLayout]) || defaultSettings.themeLayout;

  const themeStretch = getData(cookiesStore[cookiesKey.themeStretch]) || defaultSettings.themeStretch;

  return {
    themeMode,
    themeDirection,
    themeColorPresets,
    themeLayout,
    themeStretch,
  };
};

// ----------------------------------------------------------------------

const getData = (value) => {
  if (value === 'true' || value === 'false') {
    return JSON.parse(value);
  }
  if (value === 'undefined' || !value) {
    return '';
  }
  return value;
};
