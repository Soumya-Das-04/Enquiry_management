import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusModel } from '../model/status.model';
import { Observable } from 'rxjs/internal/Observable';
import { API_Response } from '../model/common.model';

@Service()
export class Status {
  http = inject(HttpClient);

  getAllStatus(): Observable<API_Response> {
    return this.http.get<API_Response>('https://api.freeprojectapi.com/api/Enquiry/get-statuses');
  }
  createNewStatus(newStatusObj: StatusModel): Observable<API_Response> {
    return this.http.post<API_Response>(
      'https://api.freeprojectapi.com/api/Enquiry/create-status',
      newStatusObj,
    );
  }
  updateStatus(data: StatusModel): Observable<API_Response> {
    return this.http.put<API_Response>(
      'https://api.freeprojectapi.com/api/Enquiry/update-status/' + data.statusId,
      data,
    );
  }
  deleteStatus(statusId: number): Observable<any> {
    return this.http.delete('https://api.freeprojectapi.com/api/Enquiry/delete-status/' + statusId);
  }
}
