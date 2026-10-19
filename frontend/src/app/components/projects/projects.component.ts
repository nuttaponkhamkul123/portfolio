import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  activeID = 0;
  projects = [
    {
      id: 0,
      title: 'Parcel Management System',
      description: 'A comprehensive desktop application engineered with Java and Swing, managing parcel logistics, sorting pipelines, and status tracking.',
      link: 'https://github.com/nuttaponkhamkul123/parcel1.0',
      img: './assets/images/projects/proj1.png',
      tags: ['Java', 'Swing GUI', 'OOP', 'Desktop App']
    },
    {
      id: 1,
      title: 'Computer Parts E-Commerce',
      description: 'Full-stack computer hardware e-commerce platform built with PHP and MySQL, featuring cart management, catalog searching, and relational database schema design.',
      link: 'https://github.com/nuttaponkhamkul123/bij',
      img: './assets/images/projects/proj2.png',
      tags: ['PHP', 'MySQL', 'Full-Stack', 'E-Commerce']
    },
    {
      id: 2,
      title: 'Aladen Flow',
      description: 'Feature-rich Kanban board and drag-and-drop visual CMS platform built with Node.js and SQLite, featuring workflow automation and modular web layout builder.',
      link: 'https://github.com/nuttaponkhamkul123/aladen-flow',
      img: './assets/images/projects/proj3.png',
      tags: ['Node.js', 'Express', 'SQLite', 'Drag & Drop', 'CMS']
    }
  ];

  constructor(public el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
  }

  setupScrollReveal(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: this.el.nativeElement.querySelectorAll('.project-item'),
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(160),
              duration: 900,
              easing: 'easeOutCubic'
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(this.el.nativeElement);
    }
  }

  onHover(el: HTMLElement, isEntering: boolean): void {
    anime({
      targets: el,
      translateY: isEntering ? -6 : 0,
      borderColor: isEntering ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
      duration: 280,
      easing: 'easeOutQuad'
    });
  }
}
