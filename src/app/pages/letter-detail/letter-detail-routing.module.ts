import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetterDetailPage } from './letter-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LetterDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetterDetailPageRoutingModule {}
