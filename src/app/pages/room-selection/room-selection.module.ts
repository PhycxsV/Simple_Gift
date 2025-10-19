import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoomSelectionPageRoutingModule } from './room-selection-routing.module';
import { RoomSelectionPage } from './room-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomSelectionPageRoutingModule
  ],
  declarations: [RoomSelectionPage]
})
export class RoomSelectionPageModule {}
