import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { IData } from 'src/app/types/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      // transition(
      //   'expanded <=> collapsed',
      //   animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      // ),
    ]),
  ],
})
export class TableComponent {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  param = {}; // for route

  currentDate = new Date();
  date = new Date(this.currentDate.setMonth(this.currentDate.getMonth()));

  maxEndDate = this.date;
  maxStartDate = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() - 6,
    this.currentDate.getDate()
  );

  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  data0: any = [];
  data1: any = [];
  dateStart: any = null;
  dateEnd: any = null;

  expanded = false;
  expandedId: null | number | string = null;

  subscribtionGeneral!: Subscription;
  subscribtionDetail!: Subscription;

  displayedColumns = ['whId', 'officeId', 'qty'];
  dataSource: any;
  columnsToDisplay = ['wh_id', 'office_id', 'qty'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: any | null;

  ngOnInit(): void {
    this.initTable();
    console.log(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
  }
  ngOnDestroy() {
    this.subscribtionDetail?.unsubscribe();
    this.subscribtionGeneral?.unsubscribe();
  }

  ngAfterViewInit(): void {}

  initTable() {
    this.subscribtionGeneral = this.dataService
      .getFirstArray()
      .subscribe((data: any) => {
        this.data0 = data;

        this.dataSource = new MatTableDataSource(this.data0);
        console.log(this.data0);
      });
  }

  refreshTable() {
    this.initTable();
    this.dateEnd = null;
    this.dateStart = null;
  }
  getDate() {
    let dateStart: any = this.range.controls.start.value;
    let dateEnd: any = this.range.controls.end.value;

    this.dateStart = `${dateStart?.getFullYear()}-${
      dateStart?.getMonth() + 1
    }-${dateStart?.getDate()}`;
    this.dateEnd = `${dateEnd?.getFullYear()}-${
      dateEnd?.getMonth() + 1
    }-${dateEnd?.getDate()}`;
  }

  getParams(id: number) {
    if (this.range.controls.start.valid && this.range.controls.end.valid) {
      this.getDate();

      this.param = {
        id: id,
        date_start: this.dateStart,
        date_end: this.dateEnd,
      };
    } else {
      this.param = { id: id };
    }
  }
  getDetailData(id: number, date_start = null, date_end = null) {
    if (this.expandedId != id) {
      this.expandedId = id;
      this.getParams(id);
      this.subscribtionDetail?.unsubscribe();
      this.data1 = [];
      if (date_start && date_end) {
        this.subscribtionDetail = this.dataService
          .getSecondArray(id, date_start, date_end)
          .subscribe((data: any) => {
            this.data1 = data;
            console.log(data);
          });
      } else {
        this.subscribtionDetail = this.dataService
          .getSecondArray(id)
          .subscribe((data: any) => {
            this.data1 = data;
            console.log(data);
          });
      }
    }
  }
}
