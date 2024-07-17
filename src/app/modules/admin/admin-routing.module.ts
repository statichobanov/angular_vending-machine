import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'product-update/:id', component: ProductUpdateComponent },
      { path: 'product-add', component: ProductAddComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
