import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone, SimpleChange } from '@angular/core';

import * as echarts from 'echarts';

@Component({
  selector: 'ui-echarts',
  template: `<div class="ui-echarts" #echarts></div>`,
  styleUrls: ['./echarts.pcss']
})
export class EchartsComponent {

  @Input() options: any = {};
  @Input() initOpt: any = {};
  @Input() theme: any = 'default';
  @Input() redraw: any;

  @Input() outObject: any = {};

  @Input()
  public set winStatus(v: any) { this.onResize(); }

  @ViewChild('echarts') echartsHost: ElementRef;

  private chart: any;
  private _previousOptions: any;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this._previousOptions = this.options;
    this.ngZone.runOutsideAngular(() => {
      this.chart = <any>(echarts.init(this.echartsHost.nativeElement, this.theme, this.initOpt));
      this.chart.setOption(this.options);

      this.outObject.echarts = this.chart;
    });

    this.onResize();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.chart && changes['redraw']) {
      this.chart.setOption(this.options);
    }
  }

  onResize() {
    setTimeout(() => {
      if (this.chart) this.chart.resize();;
    }, 100);
    setTimeout(() => {
      if (this.chart) this.chart.resize();
    }, 500);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}

