import { CommonModule } from '@angular/common';
import { enterAnimation } from './../../animation/animation';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [enterAnimation],
  imports: [CommonModule],
  standalone: true
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  activeID = 0;
  projects = [
    {
      id: 0,
      title: 'Parcel Management',
      description:
        'Personal project, Implemented with Java and Java Swing library',
      link: 'https://github.com/nuttaponkhamkul123/parcel1.0',
      img: './assets/images/projects/proj1.png',

    },
    {
      id: 1,
      title: 'CS251 Final Project',
      description: 'Computer part E-commerce using PHP and mySQL for learning database design ',
      link: 'https://github.com/nuttaponkhamkul123/bij',
      img: './assets/images/projects/proj2.png',
    }

  ];
  constructor(public el: ElementRef) { }

  ngOnInit(): void {
    // console.log('PROJECT INITIAL')
    setTimeout(() => {
      AOS.init();

    }, 3000)

  }
  ngAfterViewInit(): void {

  }
}
