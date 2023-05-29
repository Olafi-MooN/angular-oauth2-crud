import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuthRequest, IAuthResponse } from '../model/auth';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.oauth2AccessTokenUrl; // URL do endpoint de autenticação

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  async authenticate(data: IAuthRequest): Promise<IAuthResponse> {
    const { username, password } = data;
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        btoa(`${environment.oauth2ClientId}:${environment.oauth2ClientSecret}`), // Substitua com as credenciais do seu cliente OAuth2
    });

    const response = this.http.post<IAuthResponse>(
      this.authUrl,
      body.toString(),
      { headers }
    );

    const token = await lastValueFrom<IAuthResponse>(response);

    const expirationDate = new Date();
    const expirationMinutes = 60; // 60 minutos
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);

    this.cookieService.set('token', token.access_token, {
      expires: expirationDate,
    });

    return token;
  }

  public getAuthToken(): string {
    return this.cookieService.get('token');
  }

  public removeAuthToken(): void {
    this.cookieService.delete('token');
  }

  public checkRolePermission(role: string[]) {
    const decoded: any = jwt_decode(this.getAuthToken());
    const hasRole = decoded.authorities.some((auth: string) =>
      role.some((auth_role: string) => auth_role === auth)
    );
    console.log(decoded);
    console.log(hasRole);
    return hasRole;
  }
}
