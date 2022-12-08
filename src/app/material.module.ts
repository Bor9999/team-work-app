import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table'; //
import { MatButtonModule } from '@angular/material/button'; //
import { MatButtonToggleModule } from '@angular/material/button-toggle'; //
import { MatDatepickerModule } from '@angular/material/datepicker'; //
import { MatIconModule } from '@angular/material/icon'; //
import { MatInputModule } from '@angular/material/input'; //
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table'; // im

@NgModule({
  exports: [
    CdkTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  imports: [
    CdkTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
