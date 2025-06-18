import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  destroy$ = new Subject<void>();
  navPosition = EnumPosition.HORIZONTAL;
  enumPosition = EnumPosition;
  currentIndex = { index: 0, path: '/home' }
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
  @HostListener("window:resize", ['$event'])
  onResize(event: any) {
    this.navigateTo(this.currentIndex.path, this.currentIndex.index);
  }


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
    setTimeout(() => {
      this.navigateTo('/home', 0);
    }, 100)
  }
  setNavPosition(): void {

    this.navPositionService.setPosition(this.navPosition === EnumPosition.VERTICAL ? EnumPosition.HORIZONTAL : EnumPosition.VERTICAL);
    this.navPositionService.getNavPosition().pipe(take(1)).subscribe(position => {
      setTimeout(() => {
        this.navigateTo(this.currentIndex.path, this.currentIndex.index);

      }, 1)

    })
  }
  navigateTo(path: string, index: number): void {

    const elements = document.querySelectorAll('.navigations > li');
    const currentElement = elements[index] as HTMLElement;
    this.currentIndex = { index, path };

    console.log('currentElement.offsetLeft', currentElement.offsetLeft);
    console.log('currentElement.offsetTop', currentElement.offsetTop);

    if (this.navPosition === EnumPosition.HORIZONTAL) {
      this.indicator.nativeElement.style.top = 0 + 'px';
      this.indicator.nativeElement.style.left = currentElement.offsetLeft + 'px';
    }
    else {
      this.indicator.nativeElement.style.left = 0 + 'px';
      this.indicator.nativeElement.style.top = currentElement.offsetTop + 'px';
    }
    this.router.navigate([path]);
  }

}
