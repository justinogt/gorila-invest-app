import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { SidebarLink } from '../../data/sidebar-link';

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

  constructor(private afAuth: AngularFireAuth, private router: Router ) {
    this.displayName = afAuth.auth.currentUser.displayName;
    this.photoUrl = afAuth.auth.currentUser.photoURL;
  }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
