import { Component } from '@angular/core';

import { ADMIN_MENU_ITEMS, MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  isAdmin: boolean = false
  menu = MENU_ITEMS
  ngOnInit() {
    this.getRole()
    if (this.isAdmin) {
      this.menu = ADMIN_MENU_ITEMS
    }
  }
  getRole() {
    if (JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin") {
      this.isAdmin = true;
    }
  }
}
