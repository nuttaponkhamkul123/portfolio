import { Component, ElementRef, EventEmitter, OnInit, AfterViewInit, Output } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-name-banner',
  templateUrl: './name-banner.component.html',
  styleUrls: ['./name-banner.component.scss'],
  standalone: false
})
export class NameBannerComponent implements OnInit, AfterViewInit {
  @Output() onStartTour = new EventEmitter();

  firstChars = 'Nuttapon'.split('');
  lastChars = 'Khamkul'.split('');

  constructor(public el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.playEntranceAnimation();
  }

  playEntranceAnimation(): void {
    const tl = anime.timeline({
      easing: 'easeOutExpo'
    });

    tl.add({
      targets: '.banner .hero-intro',
      translateY: [-15, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutCubic'
    })
    .add({
      targets: '.banner .char',
      translateY: [70, 0],
      rotateZ: [-8, 0],
      opacity: [0, 1],
      delay: anime.stagger(35),
      duration: 900,
      easing: 'easeOutElastic(1, 0.75)'
    }, '-=350')
    .add({
      targets: '.banner .hero-subtitle',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutQuad'
    }, '-=500')
    .add({
      targets: '.banner .hero-meta',
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    }, '-=450')
    .add({
      targets: '.banner .hero-actions',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutCubic'
    }, '-=400');
  }

  startTour(): void {
    anime({
      targets: '.btn-primary',
      scale: [1, 0.94, 1.04, 1],
      duration: 350,
      easing: 'easeInOutQuad',
      complete: () => {
        this.onStartTour.emit(true);
      }
    });
  }
}
