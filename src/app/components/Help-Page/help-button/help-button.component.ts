import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { KeyBindingService } from 'src/app/services/keybinding.service';

@Component({
  selector: 'app-help-button',
  template: ` <button class="help-button" (click)="onHelpClick()">?</button> `,
  styles: [
    `
      .help-button {
        background: #00a6ff ;
        color: white;
        border: 0;
        width: 25px;
        height: 25px;
        border-radius: 25px;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
      }
    `,
  ],
})
export class HelpButtonComponent {
  constructor(private dialog: MatDialog, private keyBinding: KeyBindingService) {
    this.keyBinding.handleAltH(this.onHelpClick.bind(this))
  }

  onHelpClick() {
    console.log('on help clicked');
    this.dialog.open(HelpDialogComponent, { width: '100%', height: '80%' });
  }
}
