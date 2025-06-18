import { enterAnimation } from 'src/app/animation/animation';
import { Component, OnInit } from '@angular/core';
import { SkillsComponent } from './skills/skills.component';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [enterAnimation],
  imports: [CommonModule, SkillsComponent],
  standalone: true
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
