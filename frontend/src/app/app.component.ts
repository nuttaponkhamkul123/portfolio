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
  @ViewChildren('cmps') cmps!: QueryList<any>;
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

    console.log('this.cmps', this.cmps)
    if (this.currentIndex + 1 > this.cmps.length - 1) {
      return;
    }
    this.navigate(this.currentIndex + 1);
    // console.log('this.currentIndex',);
  }
  navigate(index: number): void {
    const target = this.cmps.get(index > -1 ? index : this.currentIndex);
    // Safely resolve the native element whether it's directly on the ref or nested in 'el'
    const element = target?.el?.nativeElement || target?.nativeElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  onScroll(e: Event): void {
    this.checkActiveSection();
  }

  onNavigateIndex(index: number): void {
    this.navigate(index);

  }


  checkActiveSection() {
    if (!this.cmps || this.cmps.length === 0) {
      return;
    }

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let foundActive = false;

    this.cmps.forEach((sectionRef, index) => {
      const element = sectionRef?.el?.nativeElement || sectionRef?.nativeElement;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < windowHeight / 2) {
        this.currentIndex = index;
        foundActive = true;
      } else if (rect.bottom > windowHeight / 2 && rect.bottom <= windowHeight) {
        this.currentIndex = index;
        foundActive = true;
      }

    });

    if (!foundActive && this.cmps.length > 0) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop === 0) {
        this.currentIndex = 0;
      } else if (scrollTop + windowHeight >= document.documentElement.scrollHeight - 1) {
        this.currentIndex = this.cmps.length - 1;
      } else {
        this.currentIndex = -1; // Or some default state
      }
    }
  }

}
