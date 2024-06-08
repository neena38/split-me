import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainComponentComponent } from './components/main-component/main-component.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'app',
    component: MainComponentComponent,
  },
  {
    path: 'room/:roomId',
    component: MainComponentComponent,
  },

  {
    path: 'help',
    loadChildren: () =>
      import('./help-dialog/help-dialog.module').then(
        (m) => m.HelpDialogModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
