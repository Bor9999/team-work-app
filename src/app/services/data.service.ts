import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData, DetailDataSlice } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getFirstArray(): Observable<Array<GeneralData>> {
    return this.http.get<Array<GeneralData>>(
      'http://193.33.194.100:8080/general'
    );
  }
  getSecondArray(
    id: number | string,
    date_start = '',
    date_end = ''
  ): Observable<Array<DetailDataSlice>> {
    if (date_start && date_end) {
      return this.http.get<Array<DetailDataSlice>>(
        'http://193.33.194.100:8080/detail',
        {
          params: { id: id, date_start: date_start, date_end: date_end },
        }
      );
    } else {
      return this.http.get<Array<DetailDataSlice>>(
        'http://193.33.194.100:8080/detail',
        {
          params: { id: id },
        }
      );
    }
  }
}
