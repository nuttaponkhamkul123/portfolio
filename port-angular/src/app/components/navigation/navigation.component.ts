import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faNetworkWired, faCircleInfo, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Subject, take, takeUntil } from 'rxjs';
import { EnumPosition } from 'src/app/model/nav-position.model';
import { NavPositionService } from 'src/app/nav-position.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('indicator') indicator: ElementRef;
  currentIndex = input(0);
  @Output() onNavigateIndex = new EventEmitter();
  destroy$ = new Subject<void>();
  navPosition = EnumPosition.HORIZONTAL;
  enumPosition = EnumPosition;
  // currentIndex = { index: 0, path: '/home' }
  listItems = [
    {
      index: 0,
      elementId: 'Home',
      path: '/home',
      icon: faHouse
    },
    {
      index: 1,
      elementId: 'Projects',
      path: '/projects',
      icon: faNetworkWired
    },
    {
      index: 2,
      elementId: 'Profile',
      path: '/profile',
      icon: faCircleInfo
    },
    {
      index: 3,
      elementId: 'contact',
      path: '/contact',
      icon: faAddressBook
    }

  ]


  constructor(private router: Router, private navPositionService: NavPositionService) { }



  ngOnInit(): void {
    this.watchNavPosition();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  watchNavPosition(): void {
    this.navPositionService.getNavPosition().pipe(takeUntil(this.destroy$)).subscribe(position => {
      this.navPosition = position;
    })
  }


  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.navigateTo('/home', 0);
    // }, 100)
  }

  navigateTo(path: string, index: number): void {

    this.onNavigateIndex.emit(index);
  }

}
