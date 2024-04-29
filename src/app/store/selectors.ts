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
