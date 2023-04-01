import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-name-profile',
  templateUrl: './name-profile.component.html',
  styleUrls: ['./name-profile.component.scss']
})
export class NameProfileComponent {
  @Input() name:string='';
  @Output() removeUser = new EventEmitter<string>();


  removeProfile() {
    console.log(this.name);
    
    this.removeUser.emit(this.name);
    
  }

}
