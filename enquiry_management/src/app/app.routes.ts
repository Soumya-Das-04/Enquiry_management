import { Routes } from '@angular/router';
import { NewEnquiry } from './pages/new-enquiry/new-enquiry';
import { StatusMaster } from './pages/status-master/status-master';
import { CategoryMaster } from './pages/category-master/category-master';
import { EnquiryList } from './pages/enquiry-list/enquiry-list';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: NewEnquiry },
  { path: 'login', component: Login },
  { path: 'status', component: StatusMaster },
  { path: 'category', component: CategoryMaster },
  { path: 'enquiry-list', component: EnquiryList },
];
