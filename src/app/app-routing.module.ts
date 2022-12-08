import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/charts/chart/chart.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DetailedChartComponent } from './components/detailed-chart/detailed-chart.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'table', component: TableComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'chart', component: DetailedChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
