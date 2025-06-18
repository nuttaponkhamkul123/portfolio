import { enterAnimation } from './../../animation/animation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [enterAnimation],
  standalone: false
})
export class ProjectsComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void { }
}
