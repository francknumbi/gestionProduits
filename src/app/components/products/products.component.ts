import {Component, OnInit} from '@angular/core';
import {ProductsServices} from "../../services/products.services";
import {Product} from "../../model/product.model";
import {catchError, map, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDriverSercice} from "../../services/event.driver.sercice";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState>|null=null;
  readonly DataStateEnum= DataStateEnum;
  constructor(private productsService:ProductsServices,private route:Router,
              private eventDrivenService:EventDriverSercice) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent)=>{
        this.onActionEvent(actionEvent);
      }
   )
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

  onNewProduct() {
    this.route.navigateByUrl("/newProduct")
  }

  onEdit(id: number) {
    this.route.navigateByUrl("/editProduct/"+id)
  }

  onActionEvent($event:ActionEvent) {
    switch ($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.oonGetAvaibleProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
    }
  }
}
