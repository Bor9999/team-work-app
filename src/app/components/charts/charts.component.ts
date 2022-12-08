import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  constructor(private dataService: DataService, private http: HttpClient) {}

  data0: any = [];
  data1: any = [];
  sortChartsArray: any = [];
  fullArray: any = [];
  subs!: Subscription;

  chartsArray: any = [];

  ngOnInit() {
    this.subs = this.dataService.getSecondArray('all').subscribe((data) => {
      for (let i in data) {
        this.fullArray = [...this.fullArray, [i, data[i]]];
      }
      console.log(this.fullArray);
    });
  }
  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  ngAfterViewInit(): void {}
}
