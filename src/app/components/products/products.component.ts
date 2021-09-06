import { Component, OnInit } from '@angular/core';
import {ProductsServices} from "../../services/products.services";
import {Product} from "../../model/product.model";
import {catchError, map, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

 products$:Observable<AppDataState>|null=null;
  readonly DataStateEnum= DataStateEnum;
  constructor(private productsService:ProductsServices) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
    )
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
    )
  }

  oonGetAvaibleProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
    )
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
    )
  }

  onSelect(p: Product) {
    this.productsService.selectProduct(p)
      .subscribe(data=>{
        p.selected=data.selected
      })
  }

  onDelete(p: Product) {
    let v= confirm("Etes vous sur de vouloir sure?");
    if(v)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }
}
