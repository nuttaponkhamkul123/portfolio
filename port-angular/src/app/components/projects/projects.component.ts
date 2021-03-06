import { enterAnimation } from './../../animation/animation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations : [enterAnimation]
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      id: 0,
      title: 'Parcel Management',
      description:
        'This project was created by me. After my dad told me to do it for his job',
      link: 'https://github.com/nuttaponkhamkul123/parcel1.0',
      img: './assets/images/projects/proj1.png',
    },
    {
      id: 1,
      title: 'CS251 Final Project',
      description: 'Computer part E-commerce using PHP and mySQL ',
      link: 'https://github.com/nuttaponkhamkul123/bij',
      img: './assets/images/projects/proj2.png',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
