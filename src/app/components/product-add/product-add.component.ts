import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsServices} from "../../services/products.services";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  submitted: boolean= false;


  public productFormGroup: FormGroup =new FormGroup({
    name: new FormControl('nom',Validators.required),
    price: new FormControl('0',Validators.required),
    quantity: new FormControl('0',Validators.required),
    selected: new FormControl(true,Validators.required),
    available: new FormControl(true,Validators.required),
  });

  constructor(private productService: ProductsServices) { }

  ngOnInit(): void {
    /*this.productFormGroup = new FormGroup({
      name: new FormControl('nom'),
      price: new FormControl('prix'),
    });*/
  }


  onSaveProduct() {
    this.submitted=true;
    if (this.productFormGroup?.invalid) return;
    this.productService.save(this.productFormGroup.value)
      .subscribe(data=>{
        alert("success saving product");
      });
  }
}
