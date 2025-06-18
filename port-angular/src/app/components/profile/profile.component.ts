import { enterAnimation } from 'src/app/animation/animation';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [enterAnimation],
    standalone: false
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
