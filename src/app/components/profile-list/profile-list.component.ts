import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/classes/profile';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { SimpleProfileService } from 'src/app/services/simple-profile.service';
import { CreateProfileModalComponent } from '../create-profile-modal/create-profile-modal.component';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { StoreService } from 'src/app/services/store.service';
import { ActionType } from 'src/app/classes/constants';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent {
  constructor(
    private foodPalette: FoodPaletteService,
    private simpleProfile: SimpleProfileService,
    private keyBinding: KeyBindingService,
    private store: StoreService,
    public dialog: MatDialog
  ) {
    this.keyBinding.handleAltP(this.onAddProfile.bind(this));
  }

  removeProfile(profile: string) {
    this.simpleProfile.remove(profile);
    this.store.fireAction(ActionType.REMOVE_PROFILE, { name: profile });
  }

  onAddProfile() {
    let dialogRef = this.dialog.open(CreateProfileModalComponent, {
      width: '250px',
      data: this.profiles,
      panelClass: 'split-me-modal',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const profile = this.simpleProfile.add(result);
        this.store.fireAction(ActionType.ADD_PROFILE, { profile: profile });
      }
    });
  }

  export() {
    this.simpleProfile.exportProfiles();
  }
  onFileInput(e: any) {
    this.simpleProfile.importProfiles(e.target.files[0]);
  }

  dragStarted(ev: CdkDragStart, profile: Profile): void {
    if (!this.simpleProfile.selections.length) {
      this.simpleProfile.selections = [profile];
    }
    ev.source.data = this.selections;
  }
  dragEnded() {
    this.clearSelections();
  }
  clearSelections() {
    this.simpleProfile.clearSelection();
  }

  get paletteIDs() {
    return this.foodPalette.paletteIDs;
  }
  get profiles() {
    return this.simpleProfile.profiles;
  }
  get selectionEnabled() {
    return this.simpleProfile.selections.length != 0;
  }
  get selections() {
    return this.simpleProfile.selections;
  }
}
