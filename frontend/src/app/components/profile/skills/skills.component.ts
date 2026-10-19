import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class SkillsComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) { }
  prog_skill = [
    {
      title: 'Javascript',
      power: 30
    },
    {
      title: 'Java',
      power: 20
    },
    {
      title: 'Angular',
      power: 30
    },
    {
      title: 'NodeJS',
      power: 30
    },
    {
      title: 'React',
      power: 30
    },
    {
      title: 'C#',
      power: 30
    },
    {
      title: 'Typescript',
      power: 30
    },
    {
      title: 'RxJS',
      power: 10
    },
    {
      title: 'Docker',
      power: 10
    },
    {
      title: 'TailwindCSS',
      power: 10
    },
    {
      title: 'Joi',
      power: 10
    },
    {
      title: 'SAP UI5',
      power: 10
    },
    {
      title: 'SAP CAP',
      power: 30
    },
    {
      title: 'SAP RAP',
      power: 30
    },
    {
      title: 'NextJS',
      power: 5
    },

  ]
  other_skill = [
    {
      title: 'Microsoft Word',
      power: 25
    },
    {
      title: 'Microsoft PowerPoint',
      power: 10
    },
    {
      title: 'Microsoft Excel',
      power: 10
    }
  ];

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: this.el.nativeElement.querySelectorAll('.skill-container'),
              scale: [0.65, 1],
              opacity: [0, 1],
              delay: anime.stagger(28),
              duration: 700,
              easing: 'easeOutBack'
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.el.nativeElement);
    }
  }

  onSkillHover(el: HTMLElement, isEntering: boolean): void {
    anime({
      targets: el,
      scale: isEntering ? 1.1 : 1,
      rotateZ: isEntering ? -1.5 : 0,
      duration: isEntering ? 250 : 200,
      easing: isEntering ? 'easeOutElastic(1, 0.6)' : 'easeOutQuad'
    });
  }
}
