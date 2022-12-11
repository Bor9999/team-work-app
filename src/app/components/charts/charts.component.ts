import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DetailDataSlice } from 'src/app/types/types';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService, private http: HttpClient) {}

  fullArray: any = [];
  subs!: Subscription;

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
