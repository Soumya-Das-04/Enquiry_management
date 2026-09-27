import { Service } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Service()
export class Common {
  $onLogin: Subject<void> = new Subject<void>();
}
