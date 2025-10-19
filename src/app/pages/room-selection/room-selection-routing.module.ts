import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomSelectionPage } from './room-selection.page';

const routes: Routes = [
  {
    path: '',
    component: RoomSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomSelectionPageRoutingModule {}
