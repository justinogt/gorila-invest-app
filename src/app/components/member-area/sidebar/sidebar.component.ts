import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { SidebarLink } from '../../../data/sidebar-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  displayName: string;
  photoUrl: string;

  links: SidebarLink[] = [
    new SidebarLink("Dashboard", "/member-area/dashboard"),
    new SidebarLink("Investimentos", "/member-area/investimentos")
  ];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().then(user => {
      this.displayName = user.displayName;
      this.photoUrl = user.photoURL;
    });
  }

  logout() {
    this.userService.logout();
  }
}
