import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(private dialog: MatDialog, private router: Router) {}

  getStarted() {
    this.router.navigate(['/app']);
    this.dialog.open(HelpDialogComponent, {
      width: '1200px',
      height: '600px',
      data: { page: pages.Help },
    });
  }
}
