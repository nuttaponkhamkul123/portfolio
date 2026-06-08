import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class SkillsComponent implements OnInit {
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
    },


  ]
  constructor() { }

  ngOnInit(): void {
  }

}
