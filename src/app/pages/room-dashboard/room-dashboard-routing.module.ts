import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDashboardPage } from './room-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: RoomDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomDashboardPageRoutingModule {}
