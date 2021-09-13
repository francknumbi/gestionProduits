import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../../state/product.state";
import {EventDriverSercice} from "../../../../services/event.driver.sercice";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?:Product;
  //@Output() eventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService:EventDriverSercice) {

  }
  ngOnInit(): void {
  }

  onEdit(id:number) {
    //this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:id})
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT,payload:id})
  }

  onDelete(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product})
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT,payload:product})
  }

  onSelect(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product})
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT,payload:product})
  }
}
