import { randomBetween } from './commons';

export class Profile {
  name: string;
  hue: number = 0;
  constructor(name: string, hue: number = randomBetween(0, 360)) {
    this.name = name;
    this.hue = hue;
  }
}
