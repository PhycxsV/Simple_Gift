import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoomDashboardPageRoutingModule } from './room-dashboard-routing.module';
import { RoomDashboardPage } from './room-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomDashboardPageRoutingModule
  ],
  declarations: [RoomDashboardPage]
})
export class RoomDashboardPageModule {}
