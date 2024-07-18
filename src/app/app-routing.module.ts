import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/product-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
