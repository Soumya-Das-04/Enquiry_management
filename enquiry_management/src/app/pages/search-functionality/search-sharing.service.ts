import { Injectable } from '@angular/core';
// BehaviorSubject stores the latest value and sends it to every current and future subscriber.
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchSharingService {
  // The initial empty string is emitted immediately to new subscribers.
  private readonly searchQuerySubject = new BehaviorSubject('');

  // Expose only an Observable so subscribers can listen but cannot publish values.
  readonly searchQuery$ = this.searchQuerySubject.asObservable();

  publishSearchQuery(query: string): void {
    // next() updates the latest value and notifies all current subscribers.
    this.searchQuerySubject.next(query);
  }
}
