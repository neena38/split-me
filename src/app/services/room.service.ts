import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '../classes/constants';
import { IAppState } from '../components/header/header.component';
import { SocketService } from './socket.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomStatus: string = 'idle';
  private apiUrl = 'http://localhost:5123';
  roomId: string = '';
  constructor(
    private http: HttpClient,
    private store: StoreService,
    private socket: SocketService
  ) {
    this.store.state$.subscribe((action) => {
      this.notifyChanges(action);
    });
  }

  createRoom(): Observable<{ roomId: string }> {
    this.roomStatus = 'connecting';
    return this.http.post<{ roomId: string }>(
      `${this.apiUrl}/createRoom`,
      this.store.state
    );
  }

  getRoomData(roomId: string): Observable<IAppState> {
    return this.http.get<IAppState>(`${this.apiUrl}/room/${roomId}`);
  }

  exitRoom() {
    this.roomStatus = 'idle';
    this.store.clearState();
  }

  notifyChanges(action: Action) {
    if (this.roomId != '' && this.socket.socketInitialized)
      this.socket.updateData(this.roomId, action);
  }

  syncCloudData(data: IAppState) {
    this.store.loadCloudState(data);
  }
}
