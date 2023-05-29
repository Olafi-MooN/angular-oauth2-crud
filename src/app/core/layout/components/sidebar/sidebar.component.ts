import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterContentChecked {
  public selectedRoute: string = window.location.pathname;
  ngAfterContentChecked() {
    this.selectedRoute = window.location.pathname;
  }

  public meetRouters(route: string) {
    return this.selectedRoute.includes(route);
  }
}
