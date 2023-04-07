import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SimpleProfileService {
  profiles: string[] = [
    'jobel',
    'arathy',
    'manju',
    'arshith',
    'athuljith',
    'yogesh',
    'joel',
    'john',
    'thomas',
    'sidharth',
    'jithin',
  ];
  constructor() {}

  remove(profile: string) {
    this.profiles = this.profiles.filter((x) => x !== profile);
  }

  add(profile: string) {
    this.profiles.push(profile);
  }
}
