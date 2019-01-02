import { Component, OnInit } from '@angular/core';
import { TouchFormDirective } from 'projects/le5le-components-lib/src/lib';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ComponentFormComponent implements OnInit {
  username: string;
  phone: number;
  email: string;
  pwd: string;
  PWD: string;
  URL: string;
  price: number;
  num: string;
  constructor() {}
  uiMin = 1;
  ngOnInit() {}
  test(data: any) {
    console.log(data);
  }
}
