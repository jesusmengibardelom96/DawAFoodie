import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoItemsPageRoutingModule } from './no-items-routing.module';

import { NoItemsPage } from './no-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoItemsPageRoutingModule
  ],
  declarations: [NoItemsPage]
})
export class NoItemsPageModule {}
