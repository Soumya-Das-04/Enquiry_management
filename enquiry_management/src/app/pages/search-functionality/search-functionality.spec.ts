import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SearchFunctionality } from './search-functionality';
import { SearchEnquiry } from './search-functionality.model';

describe('SearchFunctionality', () => {
  let component: SearchFunctionality;
  let fixture: ComponentFixture<SearchFunctionality>;
  let httpTestingController: HttpTestingController;

  const sampleEnquiries: SearchEnquiry[] = [
    {
      enquiryId: 101,
      customerName: 'Alex Morgan',
      customerEmail: 'alex@example.com',
      customerPhone: '555-0101',
      message: 'Need help with account setup',
      categoryName: 'Technical',
      statusName: 'Open',
      enquiryType: 'Website',
      enquiryDate: '2026-10-01T09:00:00Z',
    },
    {
      enquiryId: 102,
      customerName: 'Sam Rivera',
      customerEmail: 'sam@example.com',
      customerPhone: '555-0102',
      message: 'Request for pricing',
      categoryName: 'Sales',
      statusName: 'New',
      enquiryType: 'Email',
      enquiryDate: '2026-10-02T10:00:00Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFunctionality],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFunctionality);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController
      .expectOne('/data/search-enquiries.json')
      .flush(sampleEnquiries);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all local enquiries when the search is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Search Enquiries');
    expect(component.filteredEnquiries()).toHaveLength(2);
    expect(compiled.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('filters enquiries across searchable fields without case sensitivity', () => {
    component.searchQuery.set('TECHNICAL');

    expect(component.filteredEnquiries().map((enquiry) => enquiry.enquiryId)).toEqual([101]);
  });

  it('updates the results from text entered in the search box', () => {
    const input = fixture.nativeElement.querySelector('#enquirySearch') as HTMLInputElement;
    input.value = 'alex@EXAMPLE.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredEnquiries().map((enquiry) => enquiry.enquiryId)).toEqual([101]);
    expect(fixture.nativeElement.querySelectorAll('tbody tr')).toHaveLength(1);
  });

  it('shows no results when nothing matches the query', () => {
    component.searchQuery.set('no matching enquiry');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.filteredEnquiries()).toHaveLength(0);
    expect(compiled.textContent).toContain('No enquiries match');
  });
});
