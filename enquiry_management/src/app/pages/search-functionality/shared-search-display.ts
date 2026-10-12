import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SearchSharingService } from './search-sharing.service';

@Component({
  imports: [AsyncPipe],
  selector: 'app-shared-search-display',
  templateUrl: './shared-search-display.html',
})
export class SharedSearchDisplay {
  private readonly searchSharingService = inject(SearchSharingService);

  // The AsyncPipe subscribes to this RxJS Observable and receives BehaviorSubject updates.
  readonly sharedSearchQuery$ = this.searchSharingService.searchQuery$;
}
