import { Component, Input } from '@angular/core';
import { Participant } from 'src/app/classes/participant';

@Component({
  selector: 'app-advanced-profile',
  templateUrl: './advanced-profile.component.html',
  styleUrls: ['./advanced-profile.component.scss'],
})
export class AdvancedProfileComponent {
  @Input('participant') participant: Participant;
  constructor() {
    this.participant = new Participant('', 0);
  }

  removeParticipant() {}

  onContextMenuAction(item: any) {
    console.log(item);
  }
}
