import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumPosition } from './model/nav-position.model';

@Injectable({
  providedIn: 'root'
})


export class NavPositionService {
  private isVertical = new BehaviorSubject<EnumPosition>(EnumPosition.VERTICAL);
  constructor() { }

  getNavPosition() : Observable<EnumPosition> {
    return this.isVertical;
  }
  setPosition(position : EnumPosition) : void {
    this.isVertical.next(position);
  }
}
