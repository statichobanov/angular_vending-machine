import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCardComponent, ProductFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ProductCardComponent, ProductFormComponent],
})
export class SharedModule {}
