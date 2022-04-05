import { enterAnimation } from './../../animation/animation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-banner',
  templateUrl: './name-banner.component.html',
  styleUrls: ['./name-banner.component.scss'],
  animations : [enterAnimation]
})
export class NameBannerComponent implements OnInit {
  imgs: string[] = [
    '/assets/images/gallery/img1.jpg',
    '/assets/images/gallery/img2.jpg',
    '/assets/images/gallery/img3.jpg',
    '/assets/images/gallery/img4.jpg',
  ];
  toggleGallery : boolean = true;
  frameworks = [
    {
      title: 'Typescript',
      desc: 'Based language to coding this page',
      img: '/assets/images/frameworks/ts.png'
    },
    {
      title: 'Angular',
      desc: 'Based component management',
      img: '/assets/images/frameworks/angular.png'
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
