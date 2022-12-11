import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Subscription, tap } from 'rxjs';
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
  paramId: string = '';
  paramStart: string = '';
  paramEnd: string = '';

  ngOnInit(): void {
    console.log(this.chartData);
    if (!this.chartData) {
      this.subscribtionData = this.activatedRoute.queryParams
        .pipe(
          concatMap((params) => {
            this.paramId = params['id'];
            return this.loader.getSecondArray(
              params['id'],
              params['date_start'],
              params['date_end']
            );
          })
        )
        .subscribe((data) => {
          this.chartData = [this.paramId, data];
        });
    } else {
      this.chartData = [this.stateId, this.chartData];
    }
  }
  ngOnDestroy() {
    this.subscribtionData?.unsubscribe();
  }
}
