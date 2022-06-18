import { Component } from '@angular/core';
import { EnumPosition } from './model/nav-position.model';
import { NavPositionService } from './nav-position.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'port-angular';
  navPosition = EnumPosition.HORIZONTAL;
  enumPosition = EnumPosition;
  constructor(private navPositionService : NavPositionService){}
  
  ngOnInit() : void {
    this.watchNavPosition();
  }
  watchNavPosition() : void {
    this.navPositionService.getNavPosition().subscribe(position => {
      this.navPosition = position;
    })
  }
}
