import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  prog_skill = [
    {
      title : 'Javascript',
      power : 30
    },
    {
      title : 'Java',
      power : 20
    },
    {
      title : 'Angular',
      power : 30
    }
  ]
  other_skill = [
    {
      title : 'Microsoft Word',
      power : 25
    },
    {
      title : 'Microsoft PowerPoint',
      power : 10
    },
    {
      title : 'Microsoft Excel',
      power : 10
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
