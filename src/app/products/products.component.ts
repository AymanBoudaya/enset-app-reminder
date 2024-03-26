import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(http:HttpClientg) {

  }
  products : Array<any> = []
  handleCheckProduct(product: any) {
    product.checked = !product.checked
  }
}
