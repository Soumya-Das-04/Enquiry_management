import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../services/status';
import { API_Response } from '../../model/common.model';
import { response } from 'express';
import { StatusModel } from '../../model/status.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-status-master',
  styleUrl: './status-master.scss',
  templateUrl: './status-master.html',
})
export class StatusMaster implements OnInit {
  statusForm!: FormGroup;
  statusService = inject(Status);
  statusList = signal<StatusModel[]>([]);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getAllStatus();
  }

  initializeForm() {
    this.statusForm = new FormGroup({
      statusId: new FormControl(0),
      statusName: new FormControl(''),
      isActive: new FormControl(false),
    });
  }

  getAllStatus() {
    this.statusService.getAllStatus().subscribe({
      next: (response: API_Response) => {
        this.statusList.set(response.data);
      },
    });
  }

  onSaveStatus() {
    const formValue = this.statusForm.value;
    this.statusService.createNewStatus(formValue).subscribe({
      next: (response: API_Response) => {
        console.log('Status saved successfully:', response);
        if (response.result) {
          alert(response.message);
          this.getAllStatus();
        } else {
          alert(response.message);
        }
      },
    });
  }
}
