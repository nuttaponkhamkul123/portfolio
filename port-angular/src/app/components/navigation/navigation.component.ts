import { Component, OnInit } from '@angular/core';
import { faHouse,faNetworkWired,faCircleInfo,faAddressBook } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  houseIcon : any;
  projectIcon : any;
  profileIcon : any;
  contactIcon : any;
  constructor() { }

  ngOnInit(): void {
    this.houseIcon = faHouse;
    this.projectIcon = faNetworkWired;
    this.profileIcon = faCircleInfo;
    this.contactIcon = faAddressBook;
  }

}
