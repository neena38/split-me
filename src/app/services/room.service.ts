import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '../classes/constants';
import { AppStoreService } from '../store/app-store.service';
import { IApplicationState } from '../store/store';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomStatus: string = 'idle';
  private apiUrl = 'http://localhost:5123';
  roomId: string = '';
  constructor(
    private http: HttpClient,
    private store: AppStoreService,
    private socket: SocketService
  ) {
    this.store.firedAction$.subscribe((action) => {
      this.notifyChanges(action);
    });
  }

  createRoom(): Observable<{ roomId: string }> {
    this.roomStatus = 'connecting';
    return this.http.post<{ roomId: string }>(
      `${this.apiUrl}/createRoom`,
      this.store.getValue()
    );
  }
  
  getRoomData(roomId: string): Observable<IApplicationState> {
    return this.http.get<IApplicationState>(`${this.apiUrl}/room/${roomId}`);
  }

  exitRoom() {
    this.roomStatus = 'idle';
    this.store.clearState();
  }

  notifyChanges(action: Action) {
    if (this.roomId != '' && this.socket.socketInitialized)
      this.socket.updateData(this.roomId, action);
  }

  syncCloudData(data: IApplicationState) {
    this.store.setState(data);
  }
}
