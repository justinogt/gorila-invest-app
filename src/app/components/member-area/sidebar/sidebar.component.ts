import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { SidebarLink } from '../../../data/sidebar-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  displayName: string;
  photoUrl: string;

  links: SidebarLink[] = [
    new SidebarLink("Dashboard", "/member-area/dashboard"),
    new SidebarLink("Investimentos", "/member-area/investimentos")
  ];

  private _subUser: any;

  constructor(private userService: UserService) {
    this._subUser = userService.afUser.subscribe(user => {
      this.displayName = user.displayName;
      this.photoUrl = user.photoUrl;
    });

    userService.onUserLogoutEvent.push(() => this._subUser.unsubscribe());
  }
}
