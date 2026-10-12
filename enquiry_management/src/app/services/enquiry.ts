import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class Enquiry {
  http = inject(HttpClient);

  saveNewEnquiry(enquiryData: any) {
    return this.http.post('https://api.freeprojectapi.com/api/Enquiry/create-enquiry', enquiryData);
  }

  getALLCategories() {
    return this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories');
  }
}
