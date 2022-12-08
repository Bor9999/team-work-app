import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import test_data_layer0 from '../../assets/test_data_layer0.json';
import test_data_layer1 from '../../assets/test_data_layer1.json';
import { IData, IDataFull } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getFullArray(): Observable<any> {
    const data0 = this.http.get('assets/test_data_layer0.json');
    const data1 = this.http.get('assets/test_data_layer1.json');

    return forkJoin([data0, data1]);
  }
  getFirstArray(): Observable<any> {
    const data0 = this.http.get('http://193.33.194.100:8080/general');
    return data0;
  }
  getSecondArray(
    id: number | string,
    date_start = null,
    date_end = null
  ): Observable<any> {
    if (date_start && date_end) {
      const data0 = this.http.get('http://193.33.194.100:8080/detail', {
        params: { id: id, date_start: date_start, date_end: date_end },
      });
      return data0;
    } else {
      const data0 = this.http.get('http://193.33.194.100:8080/detail', {
        params: { id: id },
      });
      return data0;
    }
  }
  getSecLol(): Observable<any> {
    const data0 = this.http.get('http://193.33.194.100:8080/detail');
    return data0;
  }
}
