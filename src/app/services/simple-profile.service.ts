import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleProfileService {
  profiles: string[] = ['sachin', 'leya', 'neena','arthur'];
  constructor() { }

  remove(profile:string){
    this.profiles = this.profiles.filter((x) => x !== profile);
  }

  add(profile: string) {
    this.profiles.push(profile);
  }


}
