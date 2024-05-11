import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { buttonAnimation, cardAnimation } from 'src/app/classes/animations';
import { ActionType } from 'src/app/classes/constants';
import { FoodItem } from 'src/app/classes/food-item';
import { IBillEntry } from 'src/app/classes/interfaces';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { AppStoreService } from 'src/app/store/app-store.service';
import { ImportModalComponent } from '../import-modal/import-modal.component';
@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
  animations: [cardAnimation, buttonAnimation],
})
export class FoodPalettesBoxComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  paletteIds$: Observable<string[]>;
  constructor(
    private foodPalette: FoodPaletteService,
    private keyBinding: KeyBindingService,
    private dialog: MatDialog,
    private store: AppStoreService
  ) {
    this.keyBinding.handleAltF(this.onAddFoodPalette.bind(this));
    this.paletteIds$ = this.foodPalette.paletteIds$;
  }

  onAddFoodPalette() {
    this.foodPalette.add();
    //TODO create a smoother transition for this or discard scroll effect
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer?.nativeElement.scrollHeight),
      50
    );
  }

  onImportBill() {
    let dialogRef = this.dialog.open(ImportModalComponent, {
      panelClass: 'split-me-modal',
      width: '520px',
    });
    dialogRef.afterClosed().subscribe((result: IBillEntry[]) => {
      if (result && result.length > 0) {
        this.foodPalette.scannedReceipt(result);
      }
    });
  }

  removeFoodTile(item: FoodItem) {
    this.store.dispatch(ActionType.REMOVE_PALETTE, { id: item.id });
  }

  openDialog() {
    this.dialog.open(HelpDialogComponent, {
      width: '1200px',
      height: '600px',
      data: { page: pages.Help },
    });
  }

  get palettes$() {
    return this.foodPalette.palettes$;
  }
}
