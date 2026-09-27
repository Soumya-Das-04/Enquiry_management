import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory } from '../../model/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-category-master',
  styleUrl: './category-master.scss',
  templateUrl: './category-master.html',
})
export class CategoryMaster implements OnInit {
  http = inject(HttpClient);
  categoryList = signal<ICategory[]>([]);
  newCategoryObj: ICategory = {
    categoryId: 0,
    categoryName: '',
    isActive: false,
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories').subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.categoryList.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onSaveCategory() {
    this.http
      .post('https://api.freeprojectapi.com/api/Enquiry/create-category', this.newCategoryObj)
      .subscribe({
        next: (response: any) => {
          if (response && response.result) {
            alert('Category Created successfully!');
            this.getAllCategories();
            this.newCategoryObj = { categoryId: 0, categoryName: '', isActive: false };
          } else {
            alert(response.message || 'Failed to create category.');
          }
        },
      });
  }
}
