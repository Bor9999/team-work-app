import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detailed-chart',
  templateUrl: './detailed-chart.component.html',
  styleUrls: ['./detailed-chart.component.scss'],
})
export class DetailedChartComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: DataService
  ) {}

  chartData = history.state.chartData;
  stateId = history.state.id;
  subscribtionData!: Subscription;
  id = 'detailedID';

  ngOnInit(): void {
    console.log(this.chartData);
    if (!this.chartData) {
      // console.log('adaadad');
      this.subscribtionData = this.activatedRoute.queryParams.subscribe(
        (params) => {
          this.loader
            .getSecondArray(
              params['id'],
              params['date_start'],
              params['date_end']
            )
            .subscribe((data) => {
              this.chartData = data;
              this.chartData = [params['id'], this.chartData];
              // console.log(this.chartData);
            });
        }
      );
    } else {
      this.chartData = [this.stateId, this.chartData];
      // console.log(this.chartData);
    }
  }
  ngOnDestroy() {
    this.subscribtionData?.unsubscribe();
  }
}
