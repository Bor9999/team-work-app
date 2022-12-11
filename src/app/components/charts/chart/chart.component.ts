import {
  Component,
  HostListener,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { Chart, ChartItem, registerables, _adapters } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DetailDataSlice } from 'src/app/types/types';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor(private router: Router) {}

  //Поле для изменения фулскрина
  isFullscreen = false;

  //Получаем id графика
  @Input() id!: string;

  @Input() chartData!: Array<DetailDataSlice>;

  //В случае нажатия ESC будет сбрасываться fullscreen
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.isFullscreen = false;
  }

  //Метод переключения фулскрина
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      if (this.chartData) {
        this.viewChart();
        console.log('aa');
      }
    }
  }

  ngAfterViewInit(): void {
    this.viewChart();
    console.log('bb');
  }

  viewChart() {
    let chartStatus = Chart.getChart(this.id); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    const chart = new Chart(this.id as ChartItem, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'qty',
            data: this.chartData[1],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'WH_ID ' + this.chartData[0],
          },
        },
      },
    });
  }
}
