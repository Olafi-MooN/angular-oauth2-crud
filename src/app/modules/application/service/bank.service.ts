import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { IBank, IBankFilter } from '../models/bank';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  public apiUrl = `${environment.apiUrl}/v1/bancos`;

  constructor(private http: HttpClient) {}

  get(params?: Partial<IBankFilter>) {
    const response = this.http.get(this.apiUrl, { params });
    return response;
  }

  getById(id: string) {
    const response = this.http.get(`${this.apiUrl}/${id}`);
    return response;
  }

  deleteById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(bank: IBank): Observable<IBank> {
    return this.http.post<IBank>(this.apiUrl, bank);
  }
  update(bank: IBank): Observable<IBank> {
    return this.http.put<IBank>(`${this.apiUrl}/${bank.id}`, bank);
  }
}
