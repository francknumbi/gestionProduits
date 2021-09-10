import {Product} from "../model/product.model";
import {Type} from "@angular/core";


export enum ProductActionsTypes {
  GET_ALL_PRODUCTS="[Product] Get all products",
  GET_SELECTED_PRODUCTS="[Product] Get selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get available products",
  SEARCH_PRODUCTS="[Product] search products",
  NEW_PRODUCT="[Product] New product",
  SELECT_PRODUCT="[Product] Select product",
  DELETE_PRODUCT="[Product] Delete product",
  EDIT_PRODUCT="[Product] Edit product",
}
export interface ActionEvent {
  type:ProductActionsTypes,
  payload?:any
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export interface AppDataState {
  dataState?: DataStateEnum,
  data?: any,
  errorMessage?:string
}
