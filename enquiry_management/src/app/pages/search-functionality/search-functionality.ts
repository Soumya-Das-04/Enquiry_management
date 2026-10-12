import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SearchEnquiry } from './search-functionality.model';
import { SearchSharingService } from './search-sharing.service';
import { SharedSearchDisplay } from './shared-search-display';

@Component({
  imports: [DatePipe, SharedSearchDisplay],
  selector: 'app-search-functionality',
  styleUrl: './search-functionality.scss',
  templateUrl: './search-functionality.html',
})
export class SearchFunctionality implements OnInit {
  private readonly http = inject(HttpClient);
  // Inject the RxJS sharing service to publish updates for the independent display component.
  private readonly searchSharingService = inject(SearchSharingService);

  readonly enquiries = signal<SearchEnquiry[]>([]);
  readonly searchQuery = signal('');
  readonly isLoading = signal(true);
  readonly loadError = signal('');

  readonly filteredEnquiries = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    if (!query) {
      return this.enquiries();
    }

    return this.enquiries().filter((enquiry) =>
      [
        enquiry.enquiryId,
        enquiry.customerName,
        enquiry.customerEmail,
        enquiry.customerPhone,
        enquiry.message,
        enquiry.categoryName,
        enquiry.statusName,
        enquiry.enquiryType,
        enquiry.enquiryDate,
      ].some((value) => String(value).toLocaleLowerCase().includes(query)),
    );
  });

  ngOnInit(): void {
    this.http.get<SearchEnquiry[]>('/data/search-enquiries.json').subscribe({
      next: (enquiries) => {
        this.enquiries.set(enquiries);
        this.isLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Unable to load local search data:', error);
        this.loadError.set('Search data could not be loaded. Please refresh the page to try again.');
        this.isLoading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.searchQuery.set(input.value);
      // Publish through RxJS so the independent component receives the latest query.
      this.searchSharingService.publishSearchQuery(input.value);
    }
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchSharingService.publishSearchQuery('');
  }
}
