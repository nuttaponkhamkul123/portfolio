import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-banner',
  templateUrl: './name-banner.component.html',
  styleUrls: ['./name-banner.component.scss'],
})
export class NameBannerComponent implements OnInit {
  imgs: string[] = [
    '/assets/images/gallery/img1.jpg',
    '/assets/images/gallery/img2.jpg',
    '/assets/images/gallery/img3.jpg',
    '/assets/images/gallery/img4.jpg',
  ];
  frameworks = [
    {
      title: 'Typescript',
      desc: 'Based language to coding this page',
    },
    {
      title: 'Angular',
      desc: 'Based component management',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
