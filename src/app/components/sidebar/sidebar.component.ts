import { Component, OnInit } from '@angular/core';

import { SidebarLink } from '../../data/sidebar-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  links: SidebarLink[] = [
    new SidebarLink("Dashboard", "/dashboard"),
    new SidebarLink("Investimentos", "/investimentos")
  ];

  constructor() { }

  ngOnInit() {
  }

}
