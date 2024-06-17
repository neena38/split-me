import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { FoodItem } from 'src/app/classes/food-item';
import { Profile } from 'src/app/classes/profile';
import { RoomService } from 'src/app/services/room.service';

export interface IAppState {
  profiles: Profile[];
  palettes: FoodItem[];
  tax: number;
  discount: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private roomService: RoomService,
    private toastr: ToastrService
  ) {}

  async initiateShare() {
    // temporarily disabling to complete backend hosting
    this.toastr.info('Backend work in progress', 'Coming soon', {
      titleClass: 'socket-title',
      toastClass: 'socket-toast',
    });
    return;
    try {
      const roomId = await lastValueFrom(this.roomService.createRoom());
      this.router.navigate(['/room', roomId.roomId]);
    } catch (error) {
      console.error(error);
      this.toastr.error('Connection error');
      this.roomService.roomStatus = 'idle';
    }
  }

  exitRoom() {
    this.roomService.exitRoom();
    this.router.navigate(['/']);
  }

  get roomStatus() {
    return this.roomService.roomStatus;
  }
}
