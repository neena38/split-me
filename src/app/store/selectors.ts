import { select } from '@ngneat/elf';
import { IApplicationState } from './store';

export const profilesSelector = select(
  (state: IApplicationState) => state.profiles
);
export const palettesSelector = select(
  (state: IApplicationState) => state.palettes
);
export const palettesIdSelector = select((state: IApplicationState) =>
  state.palettes.map((palette) => palette.ID)
);
export const modifiersSelector = select(
  (state: IApplicationState) => state.modifiers
);

export const totalAmountSelector = select((state: IApplicationState) => {
  let total: number = 0;
  state.palettes.forEach((item) => {
    total += item.totalContributions;
  });
  return Math.round(total * 100) / 100;
});

export const finalAmountSelector = select((state: IApplicationState) => {
  let total: number = 0;
  state.palettes.forEach((item) => {
    total += item.totalContributions;
  });
  total += state.modifiers.tax - state.modifiers.discount;
  return Math.round(total * 100) / 100;
});
