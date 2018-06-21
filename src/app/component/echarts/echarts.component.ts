import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class ComponentEchartsComponent implements OnInit {
  options: any;
  initOpt: any = { height: 300 };
  constructor() {
    this.options = {
      title: {
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false
          },
          interval: 0,
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            margin: 0,
            padding: 0
          },
          splitLine: {
            show: false
          },
          minInterval: 0.1
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }

  ngOnInit() {}
}
