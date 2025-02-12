import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', loadChildren: () => import('./pages/start/start.module').then(m => m.StartPageModule) },
  { path: 'item-menu', loadChildren: () => import('./pages/item-menu/item-menu.module').then(m => m.ItemMenuPageModule) },
  { path: 'payment', loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
