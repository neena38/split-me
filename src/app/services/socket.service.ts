import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Action } from '../classes/constants';
import { AppStoreService } from '../store/app-store.service';
export interface IsocketMessage {
  id: ISocketUserInfo;
  action: string;
}

export interface ISocketUserInfo {
  userId: string;
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private hubConnection!: signalR.HubConnection;
  private socketUrl: string = 'https://localhost:7132/chathub';
  socketInitialized: boolean = false;

  user: ISocketUserInfo = {
    userId: '',
    username: '',
  };

  constructor(private store: AppStoreService, private toast: ToastrService) {}

  setUserInfo(id: string, name: string) {
    this.user = { userId: id, username: name };
  }

  async initSocket() {
    this.socketInitialized = true;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.socketUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    await this.hubConnection.start();

    // Socket Listeners
    this.hubConnection.on(
      'ConnectionInfo',
      (userId: string, message: string) => {
        if (userId !== this.user.userId)
          this.toast.info(message, undefined, { timeOut: 3000 });
      }
    );

    this.hubConnection.on(
      'UpdateData',
      (user: ISocketUserInfo, action: Action) => {
        if (user.userId != this.user.userId) {
          this.store.cloudDispatch(action, this.user.username);
        }
      }
    );
  }

  updateData(roomId: string, data: Action) {
    this.hubConnection.invoke('Update', roomId, this.user, data);
  }

  joinRoom(roomId: string, userId: string, username: string) {
    this.setUserInfo(userId, username);
    this.hubConnection.invoke('JoinRoom', roomId, this.user);
  }
}
