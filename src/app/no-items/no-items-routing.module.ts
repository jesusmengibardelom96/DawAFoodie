import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoItemsPage } from './no-items.page';

const routes: Routes = [
  {
    path: '',
    component: NoItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoItemsPageRoutingModule {}
