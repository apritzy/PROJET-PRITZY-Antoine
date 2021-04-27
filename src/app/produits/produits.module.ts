import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';




const appRoutes : Routes = [
  {path:'catalogue',component:CatalogueComponent},
  {path: 'detail/:id', component: DetailComponent },
  {path: 'panier', component: PanierComponent}
]


@NgModule({
  declarations: [
   CatalogueComponent,
    DetailComponent,
    PanierComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild (appRoutes)
  ]
})
export class ProduitsModule { }