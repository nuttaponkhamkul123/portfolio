import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse,faNetworkWired,faCircleInfo,faAddressBook } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('indicator') indicator : ElementRef;
  houseIcon : any;
  projectIcon : any;
  profileIcon : any;
  contactIcon : any;
  

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.houseIcon = faHouse;
    this.projectIcon = faNetworkWired;
    this.profileIcon = faCircleInfo;
    this.contactIcon = faAddressBook;
  }

  navigateTo(path : string , event : any) : void {
    console.log(event)
    console.log(event.target)
    const parent = event.target
    this.indicator.nativeElement.style.left = parent.x + 'px'  ;
    // this.indicator.nativeElement.style.top = 100 + 'px';
    this.router.navigate([path]);
  }

}
