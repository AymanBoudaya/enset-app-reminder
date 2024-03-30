import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  handleButtonClick() {
    console.log('Button clicked!');
  }

  handleGotoPage(page: number) {
    this.appState.productState.currentPage = page
    this.searchProducts();
  }
  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
  
  currentPage : number = 1

  constructor(private ps : ProductService,
              private router : Router,
              public appState : AppStateService) {

  }

  ngOnInit(): void {
    this.searchProducts()
  }

  searchProducts() {

    this.ps.searchProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize).subscribe({
      next : (resp) => {
        let products = resp.body as Product[]
        let totalProducts = parseInt(resp.headers.get('x-total-count')!)
        this.appState.productState.totalProducts = totalProducts
        let checkedProducts 
        this.appState.productState.checkedProducts = this.appState.productState.products.length
        let totalPages = Math.floor(totalProducts / this.appState.productState.pageSize)
        if (totalProducts % this.appState.productState.pageSize !=0) {
          ++totalPages
        }
        this.appState.setProductState({
          products : products,
          totalProducts: totalProducts,
          totalPages : totalPages,
          status : "LOADED"
        })
      },
      error : (err) => {
        this.appState.setProductState({
          status : "ERROR",
          errorMessage : err
        })
      }
    })
  }

  handleCheckProduct(product: Product) {
    this.ps.checkProduct(product)
    .subscribe({
      next : (updatedProduct) => {
           product.checked = !product.checked
      }
    })
  }
  
  handleDelete(product : Product) {
    if(confirm(`Etes vous sûr de vouloir supprimer le produit ${product.name} ?`))
    this.ps.deleteProduct(product)
    .subscribe({
      next : value => {
        this.searchProducts()
      }
    })

}
}