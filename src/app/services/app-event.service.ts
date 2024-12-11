import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  public blogCreated = new Subject<void>()
  constructor() {}
}
