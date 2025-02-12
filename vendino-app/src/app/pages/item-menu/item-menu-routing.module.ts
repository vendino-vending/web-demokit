import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemMenuPage } from './item-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ItemMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemMenuPageRoutingModule {}
