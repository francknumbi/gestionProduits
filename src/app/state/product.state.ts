import {Product} from "../model/product.model";
import {Type} from "@angular/core";

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
