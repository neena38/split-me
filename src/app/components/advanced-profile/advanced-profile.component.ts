import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Participant } from 'src/app/classes/participant';

@Component({
  selector: 'app-advanced-profile',
  templateUrl: './advanced-profile.component.html',
  styleUrls: ['./advanced-profile.component.scss'],
})
export class AdvancedProfileComponent {
  @Input('participant') participant: Participant;
  @Input('price') price: number;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger | undefined;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu != null) {
      this.contextMenu.menuData = { item: 'item' };
      //this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
  constructor() {
    this.participant = new Participant('', 0);
    this.price = 0;
  }

  onPortionModifier(modifier: number) {
    this.participant.contribution = parseFloat(
      (this.price * modifier).toFixed(2)
    );
    //TODO also emit to pare for updating
  }

  removeParticipant() {
    console.log('removing participant');
  }

  onContextMenuAction(item: any) {
    console.log(item);
  }
}
