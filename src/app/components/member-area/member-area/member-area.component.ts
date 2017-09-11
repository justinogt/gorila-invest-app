import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  constructor(private userService:UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
