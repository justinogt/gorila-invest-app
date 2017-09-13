import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent {

  constructor(private userService:UserService,
    private toastr: ToastsManager, vcr: ViewContainerRef) {
    toastr.setRootViewContainerRef(vcr);
  }

  logout() {
    this.userService.logout();
  }
}
