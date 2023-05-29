import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RolePermissionDirective } from './directive/role-permission.directive';
import { NavbarComponent } from './layout/components/navbar/navbar.component';

@NgModule({
  imports: [HttpClientModule, RouterModule, SharedModule],
  declarations: [RolePermissionDirective, SidebarComponent, NavbarComponent],
  exports: [SidebarComponent, NavbarComponent, RolePermissionDirective],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
