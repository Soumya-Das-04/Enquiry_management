import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Enquiry } from '../../services/enquiry';

@Component({
  imports: [FormField],
  selector: 'app-new-enquiry',
  styleUrl: './new-enquiry.scss',
  templateUrl: './new-enquiry.html',
})
export class NewEnquiry implements OnInit {
  newEnquiry = signal({
    enquiryId: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    categoryId: '',
    statusId: 357,
    enquiryType: '',
    isConverted: true,
    enquiryDate: new Date(),
    followUpDate: new Date(),
    feedback: '',
  });

  enquiryForm = form(this.newEnquiry);

  enquiryService = inject(Enquiry);
  categoryList = signal<any[]>([]);

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.enquiryService.getALLCategories().subscribe({
      next: (res: any) => {
        this.categoryList.set(res.data);
      },
    });
  }

  onSaveEnquiry(event: Event) {
    event.preventDefault();
    console.log('inside onSaveEnquiry');
    const values = this.enquiryForm().value();
    if (
      !values.customerName.trim() ||
      !values.customerEmail.trim() ||
      !values.customerPhone.trim() ||
      !values.categoryId ||
      !values.message.trim()
    ) {
      alert('Please complete all required fields.');
      return;
    }

    const formValue = { ...values, categoryId: Number(values.categoryId) };
    this.enquiryService.saveNewEnquiry(formValue).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Enquiry created successfully');
        } else {
          alert('Failed to create enquiry');
        }
      },
    });
  }
}
