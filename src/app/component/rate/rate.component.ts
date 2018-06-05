import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class ComponentRateComponent implements OnInit {
  rate1 = 1;
  rate2 = 4.76;
  rate3 = 5;
  rate4 = 1;
  rate5 = 4.76;
  rate6 = 5;
  constructor() {}

  ngOnInit() {}
}
