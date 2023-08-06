import { Component, HostListener } from '@angular/core';
import { KeyBindingService } from './services/keybinding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'split-me';

  constructor(private keyBinding: KeyBindingService) { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keyBinding.keydown(event);
  }

}