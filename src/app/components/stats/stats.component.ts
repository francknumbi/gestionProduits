import { Component, OnInit } from '@angular/core';
import {EventDriverSercice} from "../../services/event.driver.sercice";
import {ActionEvent} from "../../state/product.state";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  counter:number=0;
  constructor(private eventDrivenService:EventDriverSercice) {

  }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent:ActionEvent)=>{
        ++this.counter;
      }
    )
  }

}
