import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LetterDetailPageRoutingModule } from './letter-detail-routing.module';
import { LetterDetailPage } from './letter-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LetterDetailPageRoutingModule
  ],
  declarations: [LetterDetailPage]
})
export class LetterDetailPageModule {}
