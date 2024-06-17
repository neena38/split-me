import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalActionType } from 'src/app/classes/constants';
import { AppStoreService } from 'src/app/store/app-store.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent {
  constructor(
    private store: AppStoreService,
    public dialogRef: MatDialogRef<GettingStartedComponent>
  ) {}

  setMockData() {
    this.store.localDispatch(LocalActionType.SET_DUMMY_DATA, {});
    this.dialogRef.close();
  }
}
