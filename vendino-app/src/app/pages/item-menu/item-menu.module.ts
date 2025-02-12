import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemMenuPage } from './item-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ItemMenuPage }])
  ],
  declarations: [ItemMenuPage]
})
export class ItemMenuPageModule {}
