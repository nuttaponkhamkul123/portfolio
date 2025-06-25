import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EnumPosition } from './model/nav-position.model';
import { NavPositionService } from './nav-position.service';
import { debounceTime, fromEvent, Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'port-angular';
  navPosition = EnumPosition.HORIZONTAL;
  enumPosition = EnumPosition;
  currentIndex = 0;
  @ViewChild('prof') prof!: ElementRef;
  @ViewChild('proj') proj!: ElementRef;
  @ViewChildren('dop') cmps!: QueryList<any>;
  destroy$ = new Subject<boolean>();
  constructor(private navPositionService: NavPositionService) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
  ngAfterViewInit(): void {
    console.log('CMPS')
  }

  tour(): void {
    this.next();
  }

  watchNavPosition(): void {
    this.navPositionService.getNavPosition().subscribe(position => {
      this.navPosition = position;
    })
  }
  next(): void {


    if (this.currentIndex + 1 > this.cmps.length - 1) {
      return;
    }
    this.navigate(this.currentIndex + 1);
    // console.log('this.currentIndex',);
  }
  navigate(index: number): void {
    (this.cmps.get(index > -1 ? index : this.currentIndex)?.el as any)?.nativeElement.scrollIntoView({ behavior: "smooth" })

  }

  onScroll(e: Event): void {
    this.checkActiveSection();
  }

  onNavigateIndex(index: number): void {
    this.navigate(index);

  }


  checkActiveSection() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let foundActive = false;

    this.cmps.forEach((sectionRef, index) => {
      const rect = sectionRef.el.nativeElement.getBoundingClientRect();

      if (rect.top >= 0 && rect.top < windowHeight / 2) { // Top of element is visible and within top half of viewport
        this.currentIndex = index;
        foundActive = true;
      } else if (rect.bottom > windowHeight / 2 && rect.bottom <= windowHeight) { // Bottom of element is visible and within bottom half of viewport
        this.currentIndex = index;
        foundActive = true;
      }

    });

    if (!foundActive && this.cmps.length > 0) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop === 0) {
        this.currentIndex = this.cmps.first.nativeElement.id;
      } else if (scrollTop + windowHeight >= document.documentElement.scrollHeight - 1) {
        this.currentIndex = this.cmps.last.nativeElement.id;
      } else {
        this.currentIndex = -1; // Or some default state
      }
    }
  }

}
