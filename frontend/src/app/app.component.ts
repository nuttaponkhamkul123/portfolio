import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EnumPosition } from './model/nav-position.model';
import { NavPositionService } from './nav-position.service';
import { Subject } from 'rxjs';
import anime from 'animejs';

interface AmbientParticle {
  id: number;
  style: { [key: string]: string };
}

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
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  @ViewChild('prof') prof!: ElementRef;
  @ViewChild('proj') proj!: ElementRef;
  @ViewChildren('cmps') cmps!: QueryList<any>;
  destroy$ = new Subject<boolean>();

  isNavigating = false;
  navTimeout: any = null;

  particles: AmbientParticle[] = [];
  spotlightX = 50;
  spotlightY = 50;

  constructor(private navPositionService: NavPositionService) { }

  ngOnInit(): void {
    this.initParticles();
  }

  ngOnDestroy(): void {
    if (this.navTimeout) {
      clearTimeout(this.navTimeout);
    }
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initParticles(): void {
    const count = 20;
    const bgColors = [
      'rgba(16, 185, 129, 0.4)',
      'rgba(52, 211, 153, 0.4)',
      'rgba(6, 182, 212, 0.35)'
    ];
    const ringColors = [
      'rgba(16, 185, 129, 0.35)',
      'rgba(52, 211, 153, 0.35)',
      'rgba(6, 182, 212, 0.3)'
    ];

    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 6) + 3;
      const isRing = Math.random() > 0.6;
      const colorIndex = i % bgColors.length;

      this.particles.push({
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 95}%`,
          left: `${Math.random() * 95}%`,
          opacity: `${Math.random() * 0.35 + 0.1}`,
          borderRadius: isRing ? '50%' : (Math.random() > 0.5 ? '2px' : '50%'),
          border: isRing ? `1px solid ${ringColors[colorIndex]}` : 'none',
          backgroundColor: isRing ? 'transparent' : bgColors[colorIndex]
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.startAmbientAnimations();
  }

  startAmbientAnimations(): void {
    // Floating particles animation
    anime({
      targets: '.ambient-particle',
      translateX: () => anime.random(-30, 30),
      translateY: () => anime.random(-40, 40),
      scale: [
        { value: () => anime.random(0.8, 1.2), duration: () => anime.random(2500, 4500) },
        { value: 1, duration: () => anime.random(2500, 4500) }
      ],
      opacity: [
        { value: () => anime.random(0.15, 0.45), duration: () => anime.random(2500, 4500) },
        { value: () => anime.random(0.08, 0.2), duration: () => anime.random(2500, 4500) }
      ],
      delay: anime.stagger(100),
      duration: () => anime.random(6000, 10000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // Glowing background orbs
    anime({
      targets: '.ambient-orb-1',
      translateX: [-50, 50],
      translateY: [-40, 40],
      scale: [1, 1.15, 0.95, 1],
      duration: 16000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: '.ambient-orb-2',
      translateX: [50, -50],
      translateY: [60, -60],
      scale: [1, 0.9, 1.15, 1],
      duration: 18000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    });
  }

  onMouseMove(e: MouseEvent): void {
    this.spotlightX = e.clientX;
    this.spotlightY = e.clientY;
  }

  tour(): void {
    this.next();
  }

  watchNavPosition(): void {
    this.navPositionService.getNavPosition().subscribe(position => {
      this.navPosition = position;
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkActiveSection();
  }

  next(): void {
    if (!this.cmps || this.currentIndex + 1 >= this.cmps.length) {
      return;
    }
    this.onNavigateIndex(this.currentIndex + 1);
  }

  onNavigateIndex(index: number): void {
    if (index < 0 || !this.cmps || index >= this.cmps.length) return;

    const prevIndex = this.currentIndex;
    const isDifferentTab = prevIndex !== index;

    // Immediately highlight the clicked tab
    this.currentIndex = index;
    this.isNavigating = true;

    if (this.navTimeout) {
      clearTimeout(this.navTimeout);
    }

    const elements: HTMLElement[] = this.cmps.toArray().map(ref => ref?.el?.nativeElement || ref?.nativeElement || ref);
    const targetElement = elements[index];

    // Jump immediately without scrolling animation
    this.navigate(index);

    // Trigger Staggered Card Cascade & Title Decode
    if (isDifferentTab && targetElement) {
      this.triggerTabChangeEffect(targetElement);
    }

    // Release lock right after the immediate switch
    this.navTimeout = setTimeout(() => {
      this.isNavigating = false;
      this.checkActiveSection();
    }, 120);
  }

  triggerTabChangeEffect(targetElement: HTMLElement): void {
    // 1. Digital Matrix Decode on Section Title
    const titleEl = targetElement.querySelector('.heading-title, h1.hero-name, h2, .title') as HTMLElement;
    if (titleEl) {
      this.decodeText(titleEl);
    }

    // 2. Staggered Card Cascade on section elements
    const cards = targetElement.querySelectorAll(
      '.project-item, .experience-card, .education-graph, .skill-section, .hero-intro, .hero-subtitle, .hero-meta, .hero-actions, .form-group'
    );

    if (cards && cards.length > 0) {
      anime.remove(cards);
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.985, 1],
        delay: anime.stagger(55, { start: 20 }),
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
  }

  decodeText(element: HTMLElement): void {
    const rawText = element.getAttribute('data-original-text') || element.textContent?.trim() || '';
    if (!rawText) return;
    element.setAttribute('data-original-text', rawText);

    const glyphs = '01<>/_#$%=*+~';
    let iteration = 0;
    const maxIterations = 8;

    const interval = setInterval(() => {
      element.innerText = rawText.split('').map((char, index) => {
        if (char === ' ' || char === '\n') return char;
        if (index < (iteration / maxIterations) * rawText.length) {
          return rawText[index];
        }
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join('');

      iteration++;
      if (iteration > maxIterations) {
        clearInterval(interval);
        element.innerText = rawText;
      }
    }, 28);
  }

  navigate(index: number): void {
    const elements: HTMLElement[] = this.cmps.toArray().map(ref => ref?.el?.nativeElement || ref?.nativeElement || ref);
    const element = elements[index];
    const container = this.scrollContainer?.nativeElement;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetScrollTop = Math.max(0, container.scrollTop + (elementRect.top - containerRect.top));

      // Instant switch without scrolling animation
      anime.remove(container);
      container.scrollTop = targetScrollTop;
    } else if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  onScroll(e: Event): void {
    this.checkActiveSection();
  }

  checkActiveSection(): void {
    if (this.isNavigating || !this.cmps || this.cmps.length === 0) {
      return;
    }

    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;

    // 1. At the very top (within 40px)
    if (scrollTop <= 40) {
      if (this.currentIndex !== 0) {
        this.currentIndex = 0;
      }
      return;
    }

    // 2. Scrolled to the bottom (within 50px)
    if (scrollTop + containerHeight >= scrollHeight - 50) {
      const lastIndex = this.cmps.length - 1;
      if (this.currentIndex !== lastIndex) {
        this.currentIndex = lastIndex;
      }
      return;
    }

    // 3. Focal point detection:
    // A reference line at 35% from the top of the container.
    // Perfectly captures natural reading gaze when scrolling down sections.
    const focalY = containerRect.top + containerHeight * 0.35;

    let bestIndex = -1;
    let maxVisibleHeight = -1;

    const elements: HTMLElement[] = this.cmps.toArray().map(ref => ref?.el?.nativeElement || ref?.nativeElement || ref);

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (!el || typeof el.getBoundingClientRect !== 'function') continue;
      const rect = el.getBoundingClientRect();

      // Check if this section spans across the focal line
      if (rect.top <= focalY && rect.bottom > focalY) {
        if (this.currentIndex !== i) {
          this.currentIndex = i;
        }
        return;
      }

      // Secondary fallback: section with greatest visible height in viewport
      const visibleTop = Math.max(rect.top, containerRect.top);
      const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        bestIndex = i;
      }
    }

    if (bestIndex !== -1 && this.currentIndex !== bestIndex) {
      this.currentIndex = bestIndex;
    }
  }

}
