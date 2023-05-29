import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  public username = 'Admin';

  public logout = () => {
    this.cookieService.delete('token');
    this.router.navigate(['/auth/login']);
  };

  ngOnInit() {
    this.username = jwt_decode<{ preferred_username: string }>(
      this.cookieService.get('token')
    ).preferred_username;
  }
}
